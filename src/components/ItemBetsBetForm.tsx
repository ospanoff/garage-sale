/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Box,
  Button,
  Grid,
  Icon,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";

import useAuth from "../helpers/auth";
import db from "../helpers/firebase";

type ItemBetsBetFormProps = {
  itemId: string;
  itemPrice: number;
  userHasBet: boolean;
  setUserHasBet: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ItemBetsBetForm({
  itemId,
  itemPrice,
  userHasBet,
  setUserHasBet,
}: ItemBetsBetFormProps) {
  const [betAmount, setBetAmount] = useState(itemPrice);
  const { user } = useAuth();

  const isValidAmount = () =>
    betAmount >= itemPrice && (betAmount - itemPrice) % 100 === 0;

  const betDocRef = doc(db, "items", itemId, "bets", user!.email!);

  const bet = async () => {
    setUserHasBet(true);
    await setDoc(betDocRef, {
      createdAt: serverTimestamp(),
      amount: betAmount,
      avatarUrl: user!.photoURL,
    });
  };

  return (
    <Box component="form">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          Betting rules
          <Tooltip
            title={
              <span>
                To prevent spam using low value increases and incentify people
                to increase only when they need the item, you can only increase
                by multiple of 100 SEK or bet the same amount to queue up
              </span>
            }
          >
            <Icon sx={{ fontSize: 20 }}>info</Icon>
          </Tooltip>
        </Grid>

        <Grid item sx={{ display: "flex", alignItems: "center" }}>
          <Typography>I give</Typography>
        </Grid>
        <Grid item>
          <TextField
            id="amount"
            type="number"
            value={betAmount}
            onChange={(event) =>
              setBetAmount(parseInt(event.target.value || "0", 10))
            }
            autoComplete="off"
            size="small"
            style={{ width: "130px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">SEK</InputAdornment>
              ),
              inputProps: { step: 100 },
            }}
            error={!isValidAmount()}
          />
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title={userHasBet ? "You have already placed a bet" : ""}>
            <span>
              <Button
                color="secondary"
                onClick={bet}
                disabled={userHasBet || !isValidAmount()}
              >
                <Icon>person_add</Icon> Queue up
              </Button>
            </span>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}

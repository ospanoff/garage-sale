/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Avatar,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { ADMIN_EMAIL } from "../config";
import useAuth from "../helpers/auth";
import db from "../helpers/firebase";
import Bet, { betConverter } from "../models/Bet";

type ItemBetsListProps = {
  itemId: string;
  setUserHasBet: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ItemBetsList({
  itemId,
  setUserHasBet,
}: ItemBetsListProps) {
  const [bets, setBets] = useState<Bet[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const betsColRef = collection(db, "items", itemId, "bets").withConverter(
      betConverter
    );
    const betsQuery = query(
      betsColRef,
      orderBy("amount", "desc"),
      orderBy("createdAt")
    );
    onSnapshot(betsQuery, (querySnapshot) => {
      const dbBets: Bet[] = [];
      let userHasBet = false;
      querySnapshot.forEach((document) => {
        const bet = document.data();
        dbBets.push(bet);
        if (bet.email === user!.email!) {
          userHasBet = true;
        }
      });
      setBets(dbBets);
      setUserHasBet(userHasBet);
    });
  }, [itemId, user, setUserHasBet]);

  const removeBet = async (bettorEmail: string) => {
    const betDocRef = doc(db, "items", itemId, "bets", bettorEmail);
    await deleteDoc(betDocRef);
    setUserHasBet(false);
  };

  const acceptBet = async (bettorEmail: string) => {
    const itemDocRef = doc(db, "items", itemId);
    await updateDoc(itemDocRef, { soldTo: bettorEmail });
  };

  if (bets.length === 0) {
    return <Typography>Be the first!</Typography>;
  }

  return (
    <List>
      {bets.map((bet) => (
        <ListItem
          key={bet.email}
          secondaryAction={
            <Grid container spacing={2}>
              <Grid item>
                {user!.email! === bet.email && (
                  <IconButton edge="end" onClick={() => removeBet(bet.email)}>
                    <Icon>person_remove</Icon>
                  </IconButton>
                )}
              </Grid>
              <Grid item>
                {user!.email! === ADMIN_EMAIL && (
                  <IconButton edge="end" onClick={() => acceptBet(bet.email)}>
                    <Icon>recommend</Icon>
                  </IconButton>
                )}
              </Grid>
            </Grid>
          }
        >
          <ListItemAvatar>
            <Avatar src={bet.avatarUrl}>
              {!bet.avatarUrl && <Icon>face</Icon>}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={bet.email} secondary={`${bet.amount} SEK`} />
        </ListItem>
      ))}
    </List>
  );
}

import { Grid, Typography } from "@mui/material";
import { useState } from "react";

import Item from "../models/Item";
import ItemBetsBetForm from "./ItemBetsBetForm";
import ItemBetsList from "./ItemBetsList";

type ItemBetsProps = {
  item: Item;
};

export default function ItemBets({ item }: ItemBetsProps) {
  const [userHasBet, setUserHasBet] = useState(true);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ItemBetsBetForm
          itemId={item.id}
          itemPrice={item.price}
          userHasBet={userHasBet}
          setUserHasBet={setUserHasBet}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">People in the queue</Typography>
        <ItemBetsList itemId={item.id} setUserHasBet={setUserHasBet} />
      </Grid>
    </Grid>
  );
}

import { Box, Grid } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ItemBets from "../components/ItemBets";
import ItemCard from "../components/ItemCard";
import db from "../helpers/firebase";
import Item, { itemConverter } from "../models/Item";

export default function ItemPage() {
  const { itemId } = useParams();
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    const docRef = doc(db, "items", itemId || "").withConverter(itemConverter);
    getDoc(docRef).then((document) => {
      if (document.exists()) {
        setItem(document.data());
      }
    });
  }, [itemId]);

  if (item === undefined) {
    return <div />;
  }
  return (
    <Box sx={{ paddingTop: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <ItemCard item={item} showActions={false} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ItemBets item={item} />
        </Grid>
      </Grid>
    </Box>
  );
}

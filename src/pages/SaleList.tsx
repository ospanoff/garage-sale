import { Box, Grid } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import ItemCard from "../components/ItemCard";
import db from "../helpers/firebase";
import Item, { itemConverter } from "../models/Item";

const itemsColRef = collection(db, "items").withConverter(itemConverter);

export default function SaleList() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const itemsQuery = query(itemsColRef, where("soldTo", "==", null));
    getDocs(itemsQuery).then((snapshot) => {
      const dbItems: Item[] = [];
      snapshot.forEach((doc) => {
        dbItems.push(doc.data());
      });
      setItems(dbItems);
    });
  }, []);

  return (
    <Box sx={{ paddingTop: 3 }}>
      <Grid container spacing={4} rowSpacing={4}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

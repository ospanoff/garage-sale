import { Box, Button, Typography } from "@mui/material";
import { collection, doc, writeBatch } from "firebase/firestore";
import Papa from "papaparse";
import { useState } from "react";

import db from "../helpers/firebase";

const batch = writeBatch(db);
const itemsColRef = collection(db, "items");

interface CSVRow {
  imageUrls: string;
  name: string;
  description: string;
  price: string;
}

export default function ItemsUpload() {
  const [uploaded, setUploaded] = useState(false);

  const parseFile = (file: File) => {
    Papa.parse(file, {
      header: true,
      complete: ({ data }: Papa.ParseResult<CSVRow>) => {
        data.forEach((row) => {
          const itemDocRef = doc(itemsColRef);
          batch.set(itemDocRef, {
            imageUrls: row.imageUrls.split(","),
            name: row.name,
            description: row.description,
            price: parseInt(row.price, 10),
            soldTo: null,
          });
        });
        batch.commit().then(() => setUploaded(true));
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFileSelect = (event: any) => {
    if (event.target?.files?.length) {
      const file: File = event.target.files[0];
      parseFile(file);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 10,
      }}
    >
      {uploaded ? (
        <Typography>Uploaded!</Typography>
      ) : (
        <Button variant="contained" component="label" onChange={onFileSelect}>
          Upload items
          <input type="file" accept="text/csv" hidden />
        </Button>
      )}
    </Box>
  );
}

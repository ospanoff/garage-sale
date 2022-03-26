import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import firebaseConfig from "../config";

const firebase = initializeApp(firebaseConfig);

const db = getFirestore(firebase);

export const auth = getAuth(firebase);

export default db;

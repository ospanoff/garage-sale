const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: "garage-sale-a45ef.firebaseapp.com",
  projectId: "garage-sale-a45ef",
  storageBucket: "garage-sale-a45ef.appspot.com",
  messagingSenderId: "537183742815",
  appId: "1:537183742815:web:5652c32a44df062ac4a4ea",
};

export default firebaseConfig;

export const EMAIL_DOMAIN = import.meta.env.VITE_EMAIL_DOMAIN;
export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

# Platform for selling old items

"Garage sale" is a frontend app, that uses Firebase as a backend, for selling/giving away old items.
It's based on the auction system, where people can bid their best prices.

# Development

This project was created using `vite`. For more info go to [their website](https://vitejs.dev/).

## Configuration

Set the next env variables:

```shell
VITE_FIREBASE_API_KEY=FIREBASE_API_KEY
VITE_EMAIL_DOMAIN=DOMAIN_TO_RESTRICT_LOG_INS
VITE_ADMIN_EMAIL=EMAIL_OF_ADMIN
```

Update the next fields in `src/config.ts` with your values:

```typescript
// You can get this in your firebase project
const firebaseConfig = {
  apiKey: "THIS_IS_READ_FROM_ENV",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

export const EMAIL_DOMAIN = "THIS_IS_READ_FROM_ENV";
export const ADMIN_EMAIL = "THIS_IS_READ_FROM_ENV";
```

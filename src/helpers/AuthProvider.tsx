/* eslint-disable @typescript-eslint/no-empty-function */
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { createContext, useEffect, useMemo, useState } from "react";

import { EMAIL_DOMAIN } from "../config";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

interface AuthContextType {
  user: User | null;
  login(): Promise<void>;
  logout(): Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  async login() {},
  async logout() {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (_user) => {
      setUser(_user);
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      async login() {
        signInWithPopup(auth, provider).then((result) => {
          const { user: _user } = result;
          if (
            import.meta.env.PROD &&
            _user.email?.split("@").pop() !== EMAIL_DOMAIN
          ) {
            signOut(auth);
          }
        });
      },
      async logout() {
        signOut(auth);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

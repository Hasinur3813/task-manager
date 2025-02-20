/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";

import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      // if (user?.email) {
      //   axios
      //     .post(
      //       "https://edulink-omega.vercel.app/users/generate-token",
      //       {
      //         email: user.email,
      //         name: user.displayName,
      //       },
      //       { withCredentials: true }
      //     )
      //     .then(() => {
      //       setLoading(false);
      //       setCurrentUser(user);
      //     })
      //     .catch((err) => {
      //       setLoading(false);
      //       console.log(err?.message);
      //       setCurrentUser(user);
      //     });
      // } else {
      //   setCurrentUser(user);
      //   axios
      //     .post(
      //       "https://edulink-omega.vercel.app/users/logout",
      //       {},
      //       {
      //         withCredentials: true,
      //       }
      //     )
      //     .then(() => {
      //       setLoading(false);
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //       setLoading(false);
      //     });
      // }
    });

    return () => unsubscribe();
  }, [currentUser]);

  // sign in with google

  const signInWithGoogle = () => {
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  //   logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // update profile

  const value = {
    currentUser,
    setCurrentUser,
    logout,
    signInWithGoogle,
    loading,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

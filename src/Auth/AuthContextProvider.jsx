import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase.config";

export const AuthProvider = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  //createUserUseEmailAndPass
  const createUserUseEmailAndPass = (e, p) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, e, p);
  };

  //signInWithEmailAndPass
  const signInWithEmailAndPass = (e, p) => {
    setLoading(true);
    console.log(e, p);
    return signInWithEmailAndPassword(auth, e, p);
  };

  //goole
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //logOut
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("state change : ", currentUser);
      setLoading(false);
    });
    return () => {
      return unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUserUseEmailAndPass,
    signInWithEmailAndPass,
    signInWithGoogle,
    logOut,
  };
  return (
    <AuthProvider.Provider value={authInfo}>{children}</AuthProvider.Provider>
  );
};

export default AuthContextProvider;

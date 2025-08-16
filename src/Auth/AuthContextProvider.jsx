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
import useAxiousSecure from "../Hook/useAxiousSecure";

export const AuthProvider = createContext();

const AuthContextProvider = ({ children }) => {
  const axiosSecure = useAxiousSecure();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const [myProfile, setMyProfile] = useState(null);
  const [update, setUpdate] = useState(false);

  //createUserUseEmailAndPass
  const createUserUseEmailAndPass = (e, p) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, e, p);
  };

  //signInWithEmailAndPass
  const signInWithEmailAndPass = (e, p) => {
    setLoading(true);
    // console.log(e, p);
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
      // console.log("state change : ", currentUser);
      axiosSecure
        .get(`/profile/${currentUser?.email}`)
        .then((d) => setMyProfile(d.data))
        .catch((e) => console.log(e));
      setLoading(false);
    });
    return () => {
      return unSubscribe();
    };
  }, [axiosSecure]);

  const authInfo = {
    user,
    loading,
    createUserUseEmailAndPass,
    signInWithEmailAndPass,
    signInWithGoogle,
    logOut,

    myProfile,
    setMyProfile,

    update,
    setUpdate,
  };
  return (
    <AuthProvider.Provider value={authInfo}>{children}</AuthProvider.Provider>
  );
};

export default AuthContextProvider;

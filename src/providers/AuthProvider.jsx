import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./Firebase";
import useAxiosPublic from "../hooks/Axios/useAxiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  const updateUser = (name, dp) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: dp,
    });
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        axiosPublic
          .post("/jwt", { user: currentUser })
          .then((res) => {
            setUser(res?.data?.user);
            setLoading(false);
          })
          .catch((error) => {
            setUser(null);
            console.error(error?.message || "JWT AUTH ERROR");
            setLoading(false);
          });
      } else {
        setUser(null);
        axiosPublic.delete("/jwt");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  const values = {
    user,
    setUser,
    loading,
    setLoading,
    register,
    login,
    googleLogin,
    updateUser,
    resetPassword,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export default AuthProvider;

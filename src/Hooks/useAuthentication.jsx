import { db } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import React from "react";

export const useAuthentication = () => {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(null);

  //cleanup
  const [cancelled, setCancelled] = React.useState(false);

  const auth = getAuth();

  function checkIfIsCanceled() {
    if (cancelled) return;
  }

  const createUser = async (data) => {
    checkIfIsCanceled();
    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, {
        displayName: data.displayName,
      });
      return user;
    } catch (error) {
      let sysErrMessage;
      if (error.message.includes("Password")) {
        sysErrMessage = "A senha precisa ter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        sysErrMessage = "E-mail já cadastrado";
      } else {
        sysErrMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }
      setError(sysErrMessage);
      setLoading(false);
    }
  };

  const login = async (data) => {
    checkIfIsCanceled();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let sysErrMessage;
      if (
        error.message.includes("user-not-found") ||
        error.message.includes("wrong-password") ||
        error.message.includes("auth/invalid")
      ) {
        sysErrMessage = "Usuário ou senha não conferem";
      } else {
        sysErrMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }
      setLoading(false);
      setError(sysErrMessage);
    }
  };

  const resetPassword = async (email) => {
    checkIfIsCanceled();
    setLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
    } catch (error) {
      setLoading();
    }
  };

  const logout = () => {
    checkIfIsCanceled();
    signOut(auth);
  };
  React.useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
    resetPassword,
  };
};

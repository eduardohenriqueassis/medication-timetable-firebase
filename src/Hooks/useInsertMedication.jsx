import React from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return {
        loading: false,
        error: null,
      };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInsertMedication = (docCollection) => {
  const [response, dispatch] = React.useReducer(insertReducer, initialState);
  const [cancelled, setCancelled] = React.useState(false);

  const checkCancelledBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertMedication = async (medication) => {
    checkCancelledBeforeDispatch({
      type: "LOADING",
    });
    try {
      const newMedication = { ...medication, createdAt: Timestamp.now() };
      const insertedMedication = await addDoc(
        collection(db, docCollection),
        newMedication
      );

      checkCancelledBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedMedication,
      });
    } catch (error) {
      checkCancelledBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };
  // React.useEffect(() => {
  //   return () => setCancelled(true);
  // }, []);
  return { insertMedication, response };
};

import { updateDoc, doc } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/config";

const initialState = {
  loading: null,
  error: null,
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateMedication = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updateMedication = async (id, data) => {
    checkCancelBeforeDispatch({ type: "LOADING" });
    try {
      const medRef = await doc(db, docCollection, id);
      const updatedMedication = await updateDoc(medRef, data);
      checkCancelBeforeDispatch({
        type: "UPDATED_MED",
        payload: updatedMedication,
      });
    } catch (error) {
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  };

  // useEffect(() => {
  //   return () => setCancelled(true);
  // }, []);

  return { updateMedication, response };
};

import React from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  QuerySnapshot,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [cancelled, setCancelled] = React.useState(false);

  React.useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);
      const collectionRef = await collection(db, docCollection);

      try {
        let q;
        q = await query(collectionRef, orderBy("createdAt", "desc"));
        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    loadData();
  }, [docCollection, search, uid, cancelled]);

  React.useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};

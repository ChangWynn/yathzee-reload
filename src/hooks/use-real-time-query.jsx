import { useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../config/firebase";

export const useRealTimeQuery = (queryKey) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, queryKey), (querySnapshot) => {
      const leaderboardRecords = [];
      querySnapshot.forEach((doc) => {
        leaderboardRecords.push({ ...doc.data(), id: doc.id });
      });
      queryClient.setQueryData([queryKey], leaderboardRecords);
    });

    return () => {
      unsubscribe();
    };
  }, [queryClient, queryKey]);

  return useQuery({
    queryKey: [queryKey],
    queryFn: () => {
      return new Promise((resolve) => {
        return resolve([]);
      });
    },
  });
};

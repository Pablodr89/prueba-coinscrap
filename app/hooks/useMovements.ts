"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Movement } from "../interfaces/movementInterface";

export const useMovements = () => {
  const { data, isLoading } = useQuery<Movement[]>({
    queryKey: ["movements"],
    queryFn: async () => {
      const res = await fetch("/api/movements");
      return res.json();
    },
  });

  // --- Categorías disponibles ---
  const categories = useMemo(() => {
    if (!data) return [];
    return ["Todas", ...new Set(data.map((m) => m.category))];
  }, [data]);

  return {
    categories,
    data,
    isLoading,
  };
};

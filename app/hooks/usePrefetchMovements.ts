import { QueryClient } from "@tanstack/react-query";

export async function prefetchMovements() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movements"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/movements", {
        cache: "no-store",
      });
      return res.json();
    },
  });

  return queryClient;
}

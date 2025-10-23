"use server";

import { dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { prefetchMovements } from "./hooks/usePrefetchMovements";
import Transaction from "./components/Transaction";

export default async function MovimientosPage() {
  // Prefetch de los movimientos en el servidor
  const queryClient = await prefetchMovements();
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Transaction />
    </HydrationBoundary>
  );
}

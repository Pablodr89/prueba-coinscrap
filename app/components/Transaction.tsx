"use client";

import { useMemo, useState } from "react";
import { useMovements } from "../hooks/useMovements";
import { Sorted } from "../interfaces/movementInterface";
import HeldMovements from "./HeldMovements";
import TransactionList from "./TransactionList";

export default function Transaction() {
  const { data, categories, isLoading } = useMovements();

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("Todas");
  const [sort, setSort] = useState<Sorted>("date");
  const [direction, setDirection] = useState<"ASC" | "DESC">("DESC");

  const heldMovements = data?.filter((item) => item.pending);

  // --- Aplicar filtros y ordenamiento ---
  const filterList = useMemo(() => {
    if (!data) return [];

    let result = [...data.filter((item) => !item.pending)];

    if (searchText.trim()) {
      result = result.filter((m) =>
        m.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (category !== "Todas") {
      result = result.filter((m) => m.category === category);
    }

    if (sort === "amount") {
      result.sort((a, b) =>
        direction === "DESC" ? b.amount - a.amount : a.amount - b.amount
      );
    } else {
      result.sort((a, b) =>
        direction === "DESC"
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }

    return result;
  }, [data, searchText, category, sort, direction]);

  return (
    <>
      {heldMovements && heldMovements.length > 0 && (
        <HeldMovements heldMovements={heldMovements} />
      )}

      <div className="w-full rounded-2xl p-4 bg-white">
        <h2 className="text-base font-bold mb-4">Movimientos</h2>
        <div className="space-y-4">
          {/* Filtros */}
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="text"
              placeholder="Buscar movimiento..."
              aria-label="Buscar un movimiento..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value.trim())}
              className="border border-gray-400 rounded-full p-1 pl-3 flex-1 max-w-[200px]"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-400 rounded-full p-1.5"
              aria-label="Filtrar por categoría"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Resultados */}
          <TransactionList
            filterList={filterList}
            setSort={setSort}
            isLoading={isLoading}
            direction={direction}
            setDirection={setDirection}
          />
        </div>
      </div>
    </>
  );
}

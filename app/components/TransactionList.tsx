import { Dispatch, SetStateAction } from "react";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import { Movement, Sorted } from "../interfaces/movementInterface";
import TransactionRow from "./TransactionRow";

interface Props {
  filterList: Movement[];
  setSort: Dispatch<SetStateAction<Sorted>>;
  isLoading: boolean;
  setDirection: Dispatch<SetStateAction<"ASC" | "DESC">>;
  direction: "ASC" | "DESC";
}

export default function TransactionList({
  filterList,
  setSort,
  direction,
  setDirection,
  isLoading,
}: Props) {
  const order = (typeOrder: Sorted) => {
    setSort(typeOrder);
    if (direction === "DESC") {
      setDirection("ASC");
    } else {
      setDirection("DESC");
    }
  };

  return (
    <div className="hidden w-full rounded-t-lg lg:block">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th
              scope="col"
              className="rounded-tl-lg px-6 py-3 text-left text-sm font-medium text-black"
            >
              <div className="flex items-center gap-2">
                Fecha
                <ArrowDownIcon
                  width="16"
                  height="16"
                  onClick={() => order("date")}
                  className={`${
                    direction === "DESC" ? "rotate-0" : "rotate-180"
                  } cursor-pointer transition-all duration-300`}
                />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-black"
            >
              Categoría
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-black"
            >
              Descripción
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-black"
            >
              <div className="flex items-center gap-2">
                Importe
                <ArrowDownIcon
                  width="16"
                  height="16"
                  onClick={() => order("amount")}
                  className={`${
                    direction === "DESC" ? "rotate-0" : "rotate-180"
                  } cursor-pointer transition-all duration-300`}
                />
              </div>
            </th>
          </tr>
        </thead>

        <tbody className="">
          {isLoading ? (
            <tr>
              <td
                aria-live="polite"
                className="text-black font-semibold text-center pt-4"
                colSpan={4}
              >
                Cargando...
              </td>
            </tr>
          ) : filterList.length === 0 ? (
            <tr>
              <td
                aria-live="polite"
                className="text-black font-semibold text-center pt-4"
                colSpan={4}
              >
                No hay movimientos que coincidan.
              </td>
            </tr>
          ) : (
            filterList.map((item) => {
              return <TransactionRow key={item.id} transaction={item} />;
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

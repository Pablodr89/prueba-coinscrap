import { Movement } from "../interfaces/movementInterface";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import { useState } from "react";

export default function HeldMovements({
  heldMovements,
}: {
  heldMovements: Movement[];
}) {
  const [open, setOpen] = useState(false);

  const totalHeld = heldMovements.reduce((sum, item) => {
    const held = item.amount ?? 0;
    return sum + held;
  }, 0);
  return (
    <div className="w-full flex flex-col gap-4 items-start rounded-2xl p-4 bg-white">
      <div className="flex justify-between items-center w-full">
        <p className="text-black">
          {heldMovements.length} movimientos retenidos
        </p>

        <div className="flex items-center gap-20">
          <p className="text-black font-semibold">
            {totalHeld.toLocaleString("de-DE", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}{" "}
            €
          </p>

          <button
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Abrir movimientos retenidos"
          >
            <ArrowDownIcon
              className={`${
                open ? "rotate-180" : "rotate-0"
              } transition-all duration-300`}
            />
          </button>
        </div>
      </div>

      <div className={`w-full overflow-hidden ${open ? "h-auto" : "max-h-0"}`}>
        {heldMovements.map((item) => (
          <div
            className="flex justify-between px-4 w-full py-2 border-b rounded-lg cursor-pointer border-b-gray-200 hover:bg-gray-300"
            key={item.id}
          >
            <p className="text-black font-medium">
              {new Date(item.date).toLocaleDateString()}
            </p>
            <p className="text-black font-medium">{item.description}</p>
            <p className="text-black font-medium">
              {item.amount.toLocaleString("de-DE", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}{" "}
              €
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

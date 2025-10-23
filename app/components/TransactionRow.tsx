import { Movement } from "../interfaces/movementInterface";

interface Props {
  transaction: Movement;
}

export default function TransactionRow({ transaction }: Props) {
  return (
    <tr className=" overflow-hidden border-b border-b-gray-300 transition-all duration-300 hover:bg-gray-300">
      <td
        scope="col"
        className="flex items-center space-x-3 px-6 py-4 text-gray-600"
      >
        {new Date(transaction.date).toLocaleDateString()}
      </td>
      <td scope="col" className="px-6 py-4 text-sm font-normal text-gray-600">
        {transaction.category}
      </td>
      <td scope="col" className="px-6 py-4 text-sm font-normal text-gray-600">
        {transaction.description}
      </td>
      <td scope="col" className="px-6 py-4 text-sm font-bold text-black">
        {transaction.amount.toLocaleString("de-DE", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}{" "}
        €
      </td>
    </tr>
  );
}

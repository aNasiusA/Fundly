import TransactionCard from "./TransactionCard";
import { useAccount } from "../hooks/useAccount";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const TransactionSection = () => {
  const { transactions } = useAccount();

  return (
    <div className="w-full text-center p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Your Transactions
        </h2>
        <Link
          to="/analytics"
          className="hover:cursor-pointer flex items-center"
        >
          View all
          <ChevronRight
            className="inline ml-1 bg-black rounded-full text-white w-5 h-5 p-1"
            size={16}
          />
        </Link>
      </div>{" "}
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionSection;

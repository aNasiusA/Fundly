import type { Transaction } from "../services/db";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Utensils,
  Bus,
  ShoppingBag,
  Music,
  Receipt,
  HelpCircle,
} from "lucide-react";
import { formatCurrency } from "../services/utils";

const categoryIcons = {
  Food: <Utensils size={24} />,
  Transport: <Bus size={24} />,
  Salary: <Wallet size={24} />,
  Shopping: <ShoppingBag size={24} />,
  Entertainment: <Music size={24} />,
  Bills: <Receipt size={24} />,
  Others: <HelpCircle size={24} />,
};

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  const icon = categoryIcons[
    transaction.reason.category as keyof typeof categoryIcons
  ] ?? <HelpCircle size={24} />;

  return (
    <div
      className={`border p-2 rounded-md shadow flex justify-between items-center gap-2 ${
        transaction.type === "expense" ? "text-red-500/70" : "text-green-500/70"
      }`}
    >
      <div className="flex gap-2">
        <div className="bg-gray-300 w-12 h-12 flex items-center justify-center rounded-full">
          {icon}
        </div>

        <div className="flex flex-col justify-center items-start self-center">
          <p className="font-medium">{transaction.reason.category}</p>
          <p className="text-sm text-gray-500">
            {new Date(transaction.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {transaction.type === "expense" ? (
          <TrendingDown size={16} />
        ) : (
          <TrendingUp size={16} />
        )}
        {formatCurrency(transaction.amount)}
      </div>
    </div>
  );
};

export default TransactionCard;

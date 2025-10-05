import { useAccount } from "../hooks/useAccount";
import { formatCurrency } from "../services/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

const BalanceCard = () => {
  const { getTotalBalance, getTotalExpenses, getTotalIncome } = useAccount();

  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-4 w-80">
      <div className="text-center">
        <p className="text-xs">Current Balance</p>
        <p className="text-2xl font-bold1">
          {formatCurrency(getTotalBalance())}
        </p>
      </div>

      <div className="flex justify-between mt-4 text-center">
        <div className="text-green-500/70">
          <p className="text-xs">
            <TrendingUp className="inline" size={16} /> Total Income
          </p>
          <p className="text-md font-bold1">
            {formatCurrency(getTotalIncome())}
          </p>
        </div>

        <div className="text-red-500/70">
          <p className="text-xs">
            <TrendingDown className="inline" size={16} /> Total Expenses
          </p>
          <p className="text-md font-bold1">
            {formatCurrency(getTotalExpenses())}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;

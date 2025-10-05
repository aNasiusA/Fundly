import { type Account } from "../services/db";
import { Smartphone } from "lucide-react";
import { formatCurrency } from "../services/utils";

const AccountCard = ({ account }: { account: Account }) => {
  const returnIcon = () => {
    switch (account.type) {
      case "bank":
        return <div className="bg-green-500">Bank Icon</div>;
      case "cash":
        return <div className="bg-yellow-500">Cash Icon</div>;
      case "momo":
        return <Smartphone />;
      case "card":
        return <div className="bg-purple-500">Card Icon</div>;
      default:
        return <div className="bg-gray-500">Default Icon</div>;
    }
  };

  return (
    <div className="bg-tertiary rounded-2xl flex flex-col p-1">
      {/* Top row: icon + name */}
      <div className="flex gap-1 items-center px-2 pt-2 w-full">
        {returnIcon()}
        <p className="text-md truncate">{account.name}</p>
      </div>

      {/* Balance + ID */}
      <div className="bg-white p-4 text-xl font-bold mt-4 w-full text-left rounded-tl-xl rounded-br-xl rounded-bl-xl">
        {formatCurrency(account.balance)}
        <div className="w-full h-0.5 bg-gray-100 my-1" />
        <p className="text-xs text-secondary/25 truncate">{account.id}</p>
      </div>
    </div>
  );
};

export default AccountCard;

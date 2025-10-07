import type { Account } from "../services/db";
import {
  Smartphone,
  Wallet,
  CreditCard,
  Landmark,
  Archive,
  ArchiveRestore,
} from "lucide-react";
import { formatCurrency } from "../services/utils";
import { useLocation } from "react-router-dom";
import { useAccount } from "../hooks/useAccount";

const AccountCard = ({ account }: { account: Account }) => {
  const location = useLocation();
  const { archiveAccount, unarchiveAccount } = useAccount();

  const returnIcon = () => {
    switch (account.type) {
      case "bank":
        return <Landmark />;
      case "cash":
        return <Wallet />;
      case "momo":
        return <Smartphone />;
      case "card":
        return <CreditCard />;
      default:
        return <Wallet />;
    }
  };

  return (
    <div className="bg-tertiary rounded-2xl flex flex-col p-1">
      {/* Top row: icon + name */}
      <div className="flex gap-1 items-center justify-between px-2 pt-2 w-full">
        <div className="flex gap-1">
          {returnIcon()}
          <p className="text-md truncate">{account.name}</p>
        </div>
        {location.pathname === "/accounts" ? (
          <button
            className="w-8 h-8 bg-primary rounded-full flex items-center justify-center"
            onClick={() =>
              account.isArchived
                ? unarchiveAccount(account.id)
                : archiveAccount(account.id)
            }
          >
            {account.isArchived ? (
              <ArchiveRestore size={20} />
            ) : (
              <Archive size={20} />
            )}
          </button>
        ) : null}
      </div>

      {/* Balance + ID */}
      <div className="bg-white p-2 font-bold mt-4 w-full text-left rounded-tl-xl rounded-br-xl rounded-bl-xl">
        <p className="text-lg">{formatCurrency(account.balance)}</p>
        <div className="w-full h-0.5 bg-gray-100 my-1" />
        <p className="text-xs text-secondary/25 truncate">{account.id}</p>
      </div>
    </div>
  );
};

export default AccountCard;

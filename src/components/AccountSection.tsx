import { useAccount } from "../hooks/useAccount";
import AccountCard from "./AccountCard";
import { Plus, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const AccountSection = () => {
  const { accounts } = useAccount();

  return (
    <div className="w-full text-center p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Accounts</h2>
        <Link to="/accounts" className="hover:cursor-pointer flex items-center">
          View all
          <ChevronRight
            className="inline ml-1 bg-black rounded-full text-white w-5 h-5 p-1"
            size={16}
          />
        </Link>
      </div>
      {accounts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {accounts
            .slice(0, 4)
            .sort((a, b) => b.balance - a.balance)
            .map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-4">
          <div
            className="flex items-center space-x-2 hover:cursor-pointer"
            onClick={() => {
              console.log("Add Account");
            }}
          >
            <button className="px-4 py-2 rounded-full bg-tertiary/90 w-10 h-10 flex items-center justify-center shadow-md">
              <Plus size={16} />
            </button>
            <p className="text-gray-700 font-medium">Add Account</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSection;

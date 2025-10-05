import { useAccount } from "../hooks/useAccount";
import AccountCard from "../components/AccountCard";
import { Plus } from "lucide-react";
import BackButton from "../components/BackButton";

const AccountsPage = () => {
  const { accounts } = useAccount();

  return (
    <div className="flex flex-col p-4 h-screen">
      <div className="flex items-center justify-between w-full mb-4">
        <BackButton />
        <h1 className="text-2xl font-bold">Accounts</h1>
        <div />
      </div>

      {accounts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div
            className="flex items-center space-x-2 hover:cursor-pointer"
            onClick={() => console.log("Add Account")}
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

export default AccountsPage;

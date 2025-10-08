import { useAccount } from "../hooks/useAccount";
import AccountCard from "../components/AccountCard";
import { Plus } from "lucide-react";
import BackButton from "../components/BackButton";
import { useState } from "react";

const AccountsPage = () => {
  const { accounts, archivedAccounts } = useAccount();
  const [showArchived, setShowArchived] = useState(false);

  const renderEmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div
        className="flex items-center space-x-2 hover:cursor-pointer"
        onClick={() => console.log("Add Account")}
      >
        {showArchived ? (
          <>
            <button className="px-4 py-2 rounded-full bg-tertiary/90 w-10 h-10 flex items-center justify-center shadow-md">
              <Plus size={16} />
            </button>
            <p className="text-gray-700 font-medium">Add Account</p>
          </>
        ) : (
          <p className="text-gray-700 font-medium">No Archived Accounts</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col p-4 h-screen">
      {/* header */}
      <div className="flex items-center justify-between w-full mb-4">
        <BackButton />
        <h1 className="text-2xl font-bold text-center flex-1">Accounts</h1>
        <div className="flex justify-end w-40">
          <button
            className="px-4 py-2 rounded-full bg-tertiary/90 w-full text-sm truncate"
            onClick={() => setShowArchived(!showArchived)}
          >
            {showArchived ? "Archived Accounts" : "Active Accounts"}
          </button>
        </div>
      </div>

      {showArchived ? (
        archivedAccounts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {archivedAccounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        ) : (
          renderEmptyState()
        )
      ) : accounts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      ) : (
        renderEmptyState()
      )}
    </div>
  );
};

export default AccountsPage;

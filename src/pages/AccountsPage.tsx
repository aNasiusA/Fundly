import { useAccount } from "../hooks/useAccount";
import AccountCard from "../components/AccountCard";
import { Plus, ArrowRightLeft } from "lucide-react";
import BackButton from "../components/BackButton";
import { useState } from "react";
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
        <p className="text-gray-700 font-medium">
          {showArchived ? "No Archived Accounts" : "No Active Accounts"}
        </p>
        {!showArchived && <Plus className="w-4 h-4" />}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col p-4 h-screen">
      {/* header */}
      {/* header */}
      <div className="flex items-center justify-between w-full mb-4">
        <BackButton />
        <h1 className="text-2xl font-bold text-center flex-1">
          {showArchived ? "Archived Accounts" : "Active Accounts"}
        </h1>
        <button
          className={`flex justify-center items-center w-10 h-10 rounded-full bg-tertiary/90 transition-transform ${
            showArchived ? "rotate-180" : ""
          }`}
          onClick={() => setShowArchived(!showArchived)}
        >
          <ArrowRightLeft />
        </button>
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
        renderEmptyState()
      )}
    </div>
  );
};

export default AccountsPage;

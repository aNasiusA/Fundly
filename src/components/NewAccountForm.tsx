import { useState } from "react";
import { generateAccountId } from "../services/utils";
import type { Account } from "../services/db";
import { useAccount } from "../hooks/useAccount";

const NewAccountForm = ({ onClose }: { onClose: () => void }) => {
  const { createAccount } = useAccount();
  const [account, setAccount] = useState<Account>({
    id: "",
    name: "",
    type: "cash",
    balance: 0,
    createdAt: new Date().toISOString(),
    isArchived: false,
  });

  const handleCreateNewAccount = () => {
    if (isFormValid) {
      const newAccount = {
        ...account,
        id: generateAccountId(account.name),
        createdAt: new Date().toISOString(),
      };
      createAccount(newAccount);
      console.log("Creating account:", newAccount);
      onClose();
    } else {
      console.error("Form is invalid. Please check the inputs.");
    }
  };

  const isFormValid = account.name.trim() !== "" && !isNaN(account.balance);

  return (
    <div className="flex flex-col items-center">
      <div>
        <h2 className="text-lg font-semibold mb-2">Add Account</h2>
      </div>
      <div className="w-full flex flex-col gap-3">
        <input
          type="text"
          value={account.name}
          onChange={(e) => setAccount({ ...account, name: e.target.value })}
          placeholder="Account Name"
          className="w-full p-3 rounded-lg border border-secondary/20 focus:ring-2 focus:ring-accent outline-none transition"
        />
        <input
          type="text"
          value={account.balance}
          onChange={(e) =>
            setAccount({ ...account, balance: Number(e.target.value) })
          }
          placeholder="Account Balance"
          className="w-full p-3 rounded-lg border border-secondary/20 focus:ring-2 focus:ring-accent outline-none transition"
        />
        <select
          name="accountType"
          id="accountType"
          value={account.type}
          onChange={(e) =>
            setAccount({
              ...account,
              type: e.target.value as Account["type"],
            })
          }
          className="w-full p-3 rounded-lg border border-secondary/20 focus:ring-2 focus:ring-accent outline-none transition"
        >
          <option value="cash">Cash</option>
          <option value="bank">Bank</option>
          <option value="momo">MoMo</option>
          <option value="card">Card</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button
        className="mt-4 bg-accent text-white py-2 px-4 rounded-md"
        onClick={handleCreateNewAccount}
      >
        Create Account
      </button>
    </div>
  );
};

export default NewAccountForm;

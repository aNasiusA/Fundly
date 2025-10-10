import { useState } from "react";
import type { Transaction, TransactionReason } from "../services/db";
import { useAccount } from "../hooks/useAccount";
import { formatCurrency, generateTransactionId } from "../services/utils";
import { categories } from "../services/db";
import { notify } from "../services/notify";

const NewTransactionForm = ({ onClose }: { onClose: () => void }) => {
  const { accounts, createTransaction } = useAccount();

  const [transaction, setTransaction] = useState<Transaction>({
    id: "",
    accountId: "",
    amount: 0,
    type: "expense",
    reason: { category: "" },
    createdAt: new Date().toISOString(),
  });

  const [reason, setReason] = useState<TransactionReason>({
    category: "",
    subcategory: "",
    note: "",
    tags: [],
  });

  const handleCreateNewTransaction = () => {
    if (!isFormValid) {
      notify.error("Please provide valid transaction details.");
      console.error("Form is invalid. Please check the inputs.");
      return;
    }

    const accountName = accounts.find(
      (acc) => acc.id === transaction.accountId
    )?.name;
    const newTransaction: Transaction = {
      ...transaction,
      id: generateTransactionId(accountName || "ACC"),
      reason: reason,
      createdAt: new Date().toISOString(),
    };

    createTransaction(newTransaction);
    onClose();
  };

  const isFormValid =
    transaction.accountId !== "" &&
    !isNaN(transaction.amount) &&
    transaction.amount > 0 &&
    reason.category !== "";

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-2">Add Transaction</h2>
      <div className="w-full flex flex-col gap-3">
        {/* Account Selection */}
        <select
          value={transaction.accountId}
          onChange={(e) =>
            setTransaction({ ...transaction, accountId: e.target.value })
          }
          className="w-full p-3 rounded-lg border border-secondary/20 focus:ring-2 focus:ring-accent outline-none transition"
        >
          <option value="" disabled>
            Select an account
          </option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} ({formatCurrency(acc.balance)})
            </option>
          ))}
        </select>

        {/* Category */}
        <select
          value={reason.category}
          onChange={(e) =>
            setReason({
              ...reason,
              category: e.target.value as keyof typeof categories,
              subcategory: "",
            })
          }
          className="w-full p-3 rounded-lg border border-secondary/20 focus:ring-2 focus:ring-accent outline-none transition"
        >
          <option value="">Select category</option>
          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Subcategory */}
        {reason.category && categories[reason.category]?.length > 0 && (
          <select
            value={reason.subcategory}
            onChange={(e) =>
              setReason({ ...reason, subcategory: e.target.value })
            }
            className="w-full p-3 rounded-lg border border-secondary/20 focus:ring-2 focus:ring-accent outline-none transition"
          >
            <option value="">Select subcategory</option>
            {categories[reason.category].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        )}

        {/* Note */}
        <input
          type="text"
          value={reason.note}
          onChange={(e) => setReason({ ...reason, note: e.target.value })}
          placeholder="Optional note"
          className="w-full p-3 rounded-lg border border-secondary/20 focus:ring-2 focus:ring-accent outline-none transition"
        />

        {/* Tags */}
        <input
          type="text"
          value={reason.tags?.join(", ")}
          onChange={(e) =>
            setReason({
              ...reason,
              tags: e.target.value.split(",").map((t) => t.trim()),
            })
          }
          placeholder="Optional tags, comma separated"
          className="w-full p-3 rounded-lg border border-secondary/20 focus:ring-2 focus:ring-accent outline-none transition"
        />

        {/* Amount */}
        <input
          type="number"
          value={transaction.amount}
          onChange={(e) =>
            setTransaction({ ...transaction, amount: Number(e.target.value) })
          }
          placeholder="Amount"
          className="w-full p-3 rounded-lg border border-secondary/20 focus:ring-2 focus:ring-accent outline-none transition"
        />

        {/* Transaction Type */}
        <select
          value={transaction.type}
          onChange={(e) =>
            setTransaction({
              ...transaction,
              type: e.target.value as Transaction["type"],
            })
          }
          className="w-full p-3 rounded-lg border border-secondary/20 focus:ring-2 focus:ring-accent outline-none transition"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      {/* Submit */}
      <button
        className="mt-4 bg-accent text-white py-2 px-4 rounded-md"
        onClick={handleCreateNewTransaction}
      >
        Create Transaction
      </button>
    </div>
  );
};

export default NewTransactionForm;

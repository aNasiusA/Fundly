import { db } from "../services/db";
import type { Account, Transaction } from "../services/db";
import { useState, useEffect } from "react";
import { notify } from "../services/notify";

export const useAccount = () => {
  const [accounts, setAccounts] = useState<Account[]>(() => {
    return (db.get("accounts") as Account[]) || [];
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    return (db.get("transactions") as Transaction[]) || [];
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent;
      if (
        custom.detail.key === "accounts" ||
        custom.detail.key === "transactions" ||
        custom.detail.key === "*"
      ) {
        // Update accounts and transactions from the DB so derived values recompute
        const updatedAccounts = (db.get("accounts") as Account[]) || [];
        const updatedTransactions =
          (db.get("transactions") as Transaction[]) || [];
        setAccounts(updatedAccounts);
        setTransactions(updatedTransactions);
      }
    };

    window.addEventListener("dbchange", handler);
    return () => window.removeEventListener("dbchange", handler);
  }, []);

  const createAccount = (account: Account) => {
    const newName = account.name.trim().toLowerCase();
    const duplicate = accounts.some(
      (a) => a.name.trim().toLowerCase() === newName
    );
    if (duplicate) {
      notify.error(`Account with name "${account.name}" already exists.`);
      return false;
    }
    const newAccounts = [...accounts, account];
    db.set("accounts", newAccounts);
    setAccounts(newAccounts);
    return true;
  };

  const updateAccountBalance = (transaction: Transaction) => {
    const { accountId, amount, type } = transaction;
    const amountChange =
      type === "income" ? amount : type === "expense" ? -amount : 0;
    if (amountChange === 0) return;
    const updatedAccounts = accounts.map((acc) =>
      acc.id === accountId
        ? { ...acc, balance: acc.balance + amountChange }
        : acc
    );
    db.set("accounts", updatedAccounts);
    setAccounts(updatedAccounts);
  };

  const createTransaction = (transaction: Transaction) => {
    const newTransactions = [...transactions, transaction];
    db.set("transactions", newTransactions);
    updateAccountBalance(transaction);
  };

  const getTotalBalance = () => {
    return accounts.reduce((sum, account) => sum + account.balance, 0);
  };

  const getTotalExpenses = () => {
    return transactions
      .filter((txn) => txn.type === "expense")
      .reduce((sum, txn) => sum + txn.amount, 0);
  };

  const getTotalIncome = () => {
    return transactions
      .filter((txn) => txn.type === "income")
      .reduce((sum, txn) => sum + txn.amount, 0);
  };

  return {
    accounts,
    transactions,
    getTotalBalance,
    getTotalExpenses,
    getTotalIncome,
    createAccount,
    createTransaction,
  };
};

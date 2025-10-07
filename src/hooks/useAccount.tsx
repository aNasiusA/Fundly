import { db } from "../services/db";
import type { Account, Transaction } from "../services/db";
import { useState, useEffect } from "react";
import { notify } from "../services/notify";

export const useAccount = () => {
  const [accounts, setAccounts] = useState<Account[]>(() => {
    const all = (db.get("accounts") as Account[]) || [];
    return all.filter((acc) => !acc.isArchived);
  });

  const [archivedAccounts, setArchivedAccounts] = useState<Account[]>(() => {
    const all = (db.get("accounts") as Account[]) || [];
    return all.filter((acc) => acc.isArchived);
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
        // keep archived and active accounts in sync across hook instances
        setAccounts(updatedAccounts.filter((acc) => !acc.isArchived));
        setArchivedAccounts(updatedAccounts.filter((acc) => acc.isArchived));
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
    notify.success(`Account "${account.name}" created successfully.`);
    setAccounts(newAccounts);
    return true;
  };

  const archiveAccount = (accountId: string) => {
    const all = (db.get("accounts") as Account[]) || [];
    const account = all.find((acc) => acc.id === accountId);
    if (!account) return;

    const updatedAccount: Account = {
      ...account,
      isArchived: true,
      archivedAt: new Date().toISOString(),
    };

    const updatedAll = all.map((acc) =>
      acc.id === accountId ? updatedAccount : acc
    );
    db.set("accounts", updatedAll);
    setAccounts(updatedAll.filter((a) => !a.isArchived));
    setArchivedAccounts(updatedAll.filter((a) => a.isArchived));
    notify.success(`Account "${updatedAccount.name}" archived.`);
  };

  const unarchiveAccount = (accountId: string) => {
    const all = (db.get("accounts") as Account[]) || [];
    const account = all.find((acc) => acc.id === accountId);
    if (!account) return;

    // create a new object without archivedAt (if present) and with isArchived = false
    const updatedAccount = { ...account, isArchived: false } as Account;
    if ((updatedAccount as any).archivedAt) {
      delete (updatedAccount as any).archivedAt;
    }

    const updatedAll = all.map((acc) =>
      acc.id === accountId ? updatedAccount : acc
    );
    db.set("accounts", updatedAll);
    setAccounts(updatedAll.filter((a) => !a.isArchived));
    setArchivedAccounts(updatedAll.filter((a) => a.isArchived));
    notify.success(`Account "${updatedAccount.name}" restored.`);
  };

  // Note: add `unarchiveAccount` to the returned object below if you want it exposed.

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
    notify.success(`Transaction added successfully.`);
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
    archivedAccounts,
    transactions,
    getTotalBalance,
    getTotalExpenses,
    getTotalIncome,
    createAccount,
    createTransaction,
    archiveAccount,
    unarchiveAccount,
  };
};

export type DBShape = {
  profile: UserProfile | undefined;
  accounts: Account[];
  settings: Settings;
  transactions: Transaction[];
};

export type UserProfile = {
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
};

export type Account = {
  id: string;
  name: string;
  balance: number;
  type: "cash" | "bank" | "momo" | "card" | "other";
  createdAt: string;
  isArchived: boolean;
  archivedAt?: string;
};

type Settings = {
  currency: "GHS" | "USD" | "EUR" | "GBP" | string;
  theme: "light" | "dark";
};

export type Transaction = {
  id: string;
  accountId: string;
  amount: number;
  type: "expense" | "income";
  reason: TransactionReason;
  createdAt: string;
};

export type TransactionReason = {
  category: keyof typeof categories | "";
  subcategory?: string;
  note?: string;
  tags?: string[];
};

export const categories = {
  Food: ["Groceries", "Dining Out", "Snacks"],
  Transport: ["Ride-hailing", "Fuel", "Public Transport"],
  Salary: ["Bonus", "Monthly Salary"],
  Shopping: ["Clothes", "Electronics"],
  Entertainment: ["Movies", "Games"],
  Bills: ["Electricity", "Internet"],
  Others: [],
};
const DB_KEY = "fundly_finance_tracker_db";

const getDB = (): DBShape => {
  const raw = localStorage.getItem(DB_KEY);
  return raw
    ? JSON.parse(raw)
    : ({
        profile: undefined,
        settings: { currency: "GHS", theme: "dark" },
        accounts: [],
        transactions: [],
      } as DBShape);
};

const saveDB = (data: DBShape) => {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
};

const dispatchDBChange = (key: string, value: any) => {
  window.dispatchEvent(new CustomEvent("dbchange", { detail: { key, value } }));
};

export const db = {
  get(collection: string) {
    const data = getDB();
    // dispatchDBChange(collection, data[collection as keyof DBShape]);
    return collection ? data[collection as keyof DBShape] : data;
  },

  set(collection: string, value: any) {
    const data = getDB();
    if (collection) {
      data[collection as keyof DBShape] = value;
    } else {
      Object.assign(data, value);
    }
    saveDB(data);
    dispatchDBChange(collection, value);
  },

  add(collection: string, item: any) {
    const data = getDB();
    const target = data[collection as keyof DBShape];
    if (Array.isArray(target)) {
      target.push(item);
      saveDB(data);
      dispatchDBChange(collection, item);
      return item;
    } else {
      console.error(
        `Cannot add item. The collection "${collection}" is not an array.`
      );
    }
  },

  update(collection: string, id: string, updates: any) {
    const data = getDB();
    const target = data[collection as keyof DBShape];
    if (Array.isArray(target)) {
      const idx = target.findIndex((item: any) => item.id === id);
      if (idx === -1) {
        throw new Error(
          `Item with id "${id}" not found in collection "${collection}".`
        );
      }
      target[idx] = { ...target[idx], ...updates };
      saveDB(data);
      dispatchDBChange(collection, target[idx]);
      return target[idx];
    } else {
      console.error(
        `Cannot update item. The collection "${collection}" is not an array.`
      );
    }
  },

  delete(collection: string, id: string) {
    const data = getDB();
    const target = data[collection as keyof DBShape];
    if (Array.isArray(target)) {
      data[collection as keyof DBShape] = target.filter(
        (item: any) => item.id !== id
      ) as any;
      saveDB(data);
      dispatchDBChange(collection, data[collection as keyof DBShape]);
    } else {
      console.error(
        `Cannot delete item. The collection "${collection}" is not an array.`
      );
    }
  },

  clear() {
    localStorage.removeItem(DB_KEY);
    dispatchDBChange("*", null);
  },
};

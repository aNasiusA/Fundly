# Fundly — Offline Expense Tracker & Account Mirror

Fundly is a small, client-side, offline-first expense tracker and account mirror built with React + Vite + TypeScript. It stores all data in browser localStorage and exposes a tiny in-app DB abstraction with a set of React hooks for UI wiring. The app is designed as a minimal, easy-to-extend starting point for personal finance tooling.

Key ideas:

- Offline-first: all data lives in localStorage (no server required).
- Account mirror: accounts keep balances and transactions update balances.
- Small, composable UI: pages, components, and hooks are intentionally simple.

This README documents the code structure, how the app persists data, how to run and extend the project, and developer notes.

## Quick demo (run locally)

Requirements:

- Node.js (v16+ recommended)

Install and run:

```powershell
npm install
npm run dev
```

Open the local dev URL printed by Vite (usually http://localhost:5173).

## What you'll find in this repo

- `package.json` — project scripts & dependencies (React, Vite, lucide-react, Tailwind helpers)
- `src/` — main application source
  - `App.tsx` — router and auth gating (uses profile to determine whether to show the app or the get-started flow)
  - `main.tsx` — app entry
  - `index.css` — global styles (Tailwind is used in components)
  - `components/` — small reusable UI pieces (cards, forms, modal, layout)
  - `hooks/` — application hooks (`useProfile`, `useAccount`)
  - `pages/` — route pages (Home, Accounts, Analytics, Profile, GetStarted)
  - `services/` — local db abstraction and small utilities (`db.ts`, `utils.ts`)

## Architecture & data flow

- Storage: `src/services/db.ts` manages a single JSON blob in localStorage under the key `fundly_finance_tracker_db`.
- Change events: when the DB is mutated `db.set/add/update/delete/clear` dispatches a `CustomEvent('dbchange')` so the rest of the app can react.
- Hooks: `useProfile` and `useAccount` read from the DB on mount and subscribe to `dbchange` events to keep UI state in sync.
- Mutations: UI components call into the hook helpers which call `db.set(...)` or `db.add(...)`. `useAccount.createTransaction` also updates the relevant account balance.

## Primary types (short summary)

From `src/services/db.ts` (Typescript types are defined there):

- UserProfile
  - username, email, avatar, createdAt
- Account
  - id: string
  - name: string
  - balance: number
  - type: "cash" | "bank" | "momo" | "card" | "other"
  - createdAt: string
- Transaction
  - id: string
  - accountId: string
  - amount: number
  - type: "expense" | "income"
  - reason: { category, subcategory?, note?, tags? }
  - createdAt: string

The DB shape is a single object with properties: `profile`, `accounts`, `settings`, `transactions`.

## Key modules and how to use them

- src/services/db.ts

  - db.get(collection) — returns the value for that collection (or entire DB when collection falsy)
  - db.set(collection, value) — replace a collection (or merge top-level when collection falsy)
  - db.add(collection, item) — push an item onto an array collection
  - db.update(collection, id, updates) — find by id and merge
  - db.delete(collection, id) — remove item by id
  - db.clear() — delete the DB key entirely and emit `dbchange('*')`

  Note: All mutations call save -> dispatch `dbchange` so components can re-read or hooks can react.

- src/services/utils.ts

  - formatCurrency(amount, currency?, locale?) — formats numbers using Intl based on `settings.currency`
  - generateAccountId(accountName, createdAt?) — returns a short account id (name part + timestamp part)
  - generateTransactionId(accountName) — returns a string using account name, timestamp and random digits

- src/hooks/useAccount.tsx

  - Exposes: accounts, transactions, getTotalBalance(), getTotalExpenses(), getTotalIncome(), createAccount(account), createTransaction(transaction)
  - Behavior: creates/updates in local DB and ensures account balances are updated when transactions are created.

- src/hooks/useProfile.tsx
  - Exposes: profile, setProfile(value) — wraps db.get/db.set for profile and subscribes to `dbchange` events

## UI overview

- `Layout.tsx` — top-level layout, bottom navigation, and a centralized floating + button that opens a `Modal` to create either a transaction (from Home) or an account (from Accounts). The modal contents are `NewTransactionForm` or `NewAccountForm`.
- `HomePage` — shows greeting, `BalanceCard`, `AccountSection` and `TransactionSection`.
- `AccountsPage` — lists all accounts using `AccountCard`.
- Forms
  - `NewAccountForm` — collects name, balance, and type; uses `useAccount.createAccount` and `utils.generateAccountId`.
  - `NewTransactionForm` — select account, category/subcategory, amount and type; uses `useAccount.createTransaction` and `utils.generateTransactionId`.

## Common developer tasks

- Reset the app storage (dev):

```javascript
// in the browser console
window.localStorage.removeItem("fundly_finance_tracker_db");
// or using the db helper from console if imported/available
// db.clear();
```

- Inspect current DB in console:

```javascript
JSON.parse(localStorage.getItem("fundly_finance_tracker_db") || "{}");
```

## Edge cases & known limitations

- Race conditions: `db` is a simple localStorage wrapper without locking. Multiple tabs can overwrite each other.
- Missing validation: forms perform light client-side checks, but there is no robust validation library or error UI.
- No tests: there are no unit tests in the starter — adding some for `services/*` and hooks would be high ROI.
- No export/import: there is no CSV/JSON export or backup mechanism yet.

## Suggested improvements / roadmap

Short-term (low risk):

- Add unit tests for `utils` and `db` (Jest / Vitest).
- Improve form validation and error messages (Zod / Yup or native checks + UI feedback).
- Implement export/import (JSON) so users can backup/restore data.

Medium-term:

- Add synchronization across tabs using BroadcastChannel or add an optional backend sync.
- Implement charts & analytics (pie chart of categories, monthly cashflow) in `AnalyticsPage`.

Long-term / optional:

- Encrypt local DB with a passphrase.
- Add CSV export and scheduled backup to cloud storage providers.

## Contribution

This project is intentionally small and ready for contributions. If you add features,
please follow the existing styles (TypeScript + React + functional components) and
add tests for business logic where practical.

## Troubleshooting

- Blank page after dev start: ensure dependencies are installed and you're running Node 16+.
- Local data not showing: open devtools > Application > Local Storage and verify `fundly_finance_tracker_db` exists. Use the reset snippet above to clear.

## License

This project contains no explicit license;

---

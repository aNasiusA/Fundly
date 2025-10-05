import { useProfile } from "../hooks/useProfile";
import BalanceCard from "../components/BalanceCard";
import AccountSection from "../components/AccountSection";
import TransactionSection from "../components/TransactionSection";

const HomePage = () => {
  const { profile } = useProfile();

  return (
    <div className="h-screen p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-md font-semibold">Hello, {profile?.username}!</h1>
          <p className="text-xs opacity-70">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-tertiary" />
      </div>

      <div className="flex flex-col items-center justify-center mb-4">
        <BalanceCard />
      </div>

      <div className="flex flex-col items-center justify-center mb-4">
        <AccountSection />
      </div>

      <div className="flex flex-col items-center justify-center">
        <TransactionSection />
      </div>
    </div>
  );
};

export default HomePage;

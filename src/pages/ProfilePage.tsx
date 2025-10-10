import { useProfile } from "../hooks/useProfile";
import { useSettings } from "../hooks/useSettings";

const ProfilePage = () => {
  const { profile } = useProfile();
  const { settings, setCurrency } = useSettings();
  return (
    <div>
      <div className="flex justify-center mt-20">
        <div className="w-40 h-40 bg-tertiary rounded-full" />
      </div>
      <div className="mt-4 text-center">
        <h1 className="text-2xl font-bold">{profile?.username}</h1>
        <p className="text-gray-600">{profile?.email}</p>

        <select
          name="currency"
          id=""
          value={settings.currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="mt-4 p-2 border border-secondary/20 rounded-lg focus:ring-2 focus:ring-accent outline-none transition"
        >
          <option value="">Select your currency</option>
          <option value="GHS">GHS</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
    </div>
  );
};

export default ProfilePage;

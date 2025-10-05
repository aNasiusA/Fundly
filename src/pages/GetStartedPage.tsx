import LogoWithText from "../components/LogoWithText";
import { useState } from "react";
import { useProfile } from "../hooks/useProfile";

const GetStartedPage = () => {
  const { setProfile } = useProfile();
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    avatar: "",
    createdAt: undefined,
  });

  const handleGetStarted = () => {
    const newProfile = {
      ...userProfile,
      createdAt: new Date().toISOString(),
    };

    console.log("Final profile:", newProfile);
    setProfile(newProfile);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-5">
      <LogoWithText />
      <div className="border border-white/50 rounded-2xl p-6 flex flex-col items-center space-y-6 shadow-lg">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Get Started💵</h1>
          <p className="text-sm opacity-80">
            Manage your finances effectively with our app.
          </p>
        </div>

        <div className="space-y-4 w-80">
          <input
            type="text"
            value={userProfile.username}
            onChange={(e) =>
              setUserProfile({ ...userProfile, username: e.target.value })
            }
            placeholder="Username"
            className="w-full p-3 rounded-lg border border-secondary/20 focus:ring-2 focus:ring-accent outline-none transition"
          />
          <input
            type="email"
            value={userProfile.email}
            onChange={(e) =>
              setUserProfile({ ...userProfile, email: e.target.value })
            }
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-secondary/20 focus:ring-2 focus:ring-accent outline-none transition"
          />
        </div>

        <button
          onClick={handleGetStarted}
          className="w-40 bg-accent text-white p-3 rounded-lg font-semibold shadow-md hover:opacity-90 active:scale-[0.98] transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default GetStartedPage;

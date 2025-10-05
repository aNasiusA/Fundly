import { useState, useEffect } from "react";
import { db, type UserProfile } from "../services/db";

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | undefined>(
    () => db.get("profile") as UserProfile | undefined
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail.key === "profile" || custom.detail.key === "*") {
        setProfile(db.get("profile") as UserProfile | undefined);
      }
    };

    window.addEventListener("dbchange", handler);
    return () => window.removeEventListener("dbchange", handler);
  }, []);

  return {
    profile,
    setProfile: (value: UserProfile) => db.set("profile", value),
  };
};

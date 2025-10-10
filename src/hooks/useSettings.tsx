import { useEffect, useState } from "react";
import { db } from "../services/db";
import type { Settings } from "../services/db";

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(() => {
    return (
      (db.get("settings") as Settings) || { currency: "GHS", theme: "dark" }
    );
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail.key === "settings" || custom.detail.key === "*") {
        setSettings(db.get("settings") as Settings);
      }
    };

    window.addEventListener("dbchange", handler);
    return () => window.removeEventListener("dbchange", handler);
  }, []);

  const setCurrency = (currency: string) => {
    const updated: Settings = { ...settings, currency };
    db.set("settings", updated);
    setSettings(updated);
  };

  const setTheme = (theme: "light" | "dark") => {
    const updated: Settings = { ...settings, theme };
    db.set("settings", updated);
    setSettings(updated);
  };

  const toggleTheme = () => {
    setTheme(settings.theme === "dark" ? "light" : "dark");
  };

  return {
    settings,
    setCurrency,
    setTheme,
    toggleTheme,
  } as const;
};

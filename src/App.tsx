import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useProfile } from "./hooks/useProfile";
import HomePage from "./pages/HomePage";
import GetStartedPage from "./pages/GetStartedPage";
import AccountsPage from "./pages/AccountsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { profile } = useProfile();

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            style: { background: "green" },
          },
          error: {
            style: { background: "red" },
          },
        }}
      />
      <Routes>
        {profile ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="accounts" element={<AccountsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        ) : (
          <Route path="*" element={<GetStartedPage />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

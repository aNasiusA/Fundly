import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useProfile } from "./hooks/useProfile";
import HomePage from "./pages/HomePage";
import GetStartedPage from "./pages/GetStartedPage";
import AccountsPage from "./pages/AccountsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";

const App = () => {
  const { profile } = useProfile();

  return (
    <BrowserRouter>
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

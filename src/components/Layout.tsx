import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Home, ChartLine, UserRound, Wallet, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import NewAccountForm from "./NewAccountForm";
import NewTransactionForm from "./NewTransactionForm";

const Layout = () => {
  const location = useLocation();

  const navigationItems = [
    { name: "Home", to: "/", icon: Home },
    { name: "Accounts", to: "/accounts", icon: Wallet },
    { name: "Analytics", to: "/analytics", icon: ChartLine },
    { name: "Profile", to: "/profile", icon: UserRound },
  ];

  // Determine if plus button should show and its action
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showPlus =
    location.pathname === "/" || location.pathname.startsWith("/accounts");

  const handlePlusClick = () => {
    // On homepage open Add Transaction modal; on accounts open Add Account modal
    setIsModalOpen(true);
  };

  // Close modal when route changes to avoid stale modal on navigation
  useEffect(() => {
    setIsModalOpen(false);
  }, [location.pathname]);

  return (
    <div>
      <div>
        <Outlet />
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-tertiary/10 border-gray-200 z-40">
        <div className="relative flex justify-around items-center px-2 py-2">
          {navigationItems.map((item, index) => {
            const middleIndex = Math.floor(navigationItems.length / 2);
            return (
              <React.Fragment key={item.name}>
                {index === middleIndex && showPlus && <div className="w-16" />}
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `flex flex-col items-center text-center p-2 ${
                      isActive ? "text-accent rounded-md" : "text-black"
                    } hover:bg-gray-100`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <p className="text-xs">{item.name}</p>
                </NavLink>
              </React.Fragment>
            );
          })}

          {showPlus && (
            <button
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-accent-dark transition"
              onClick={handlePlusClick}
            >
              <Plus className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
      {/* Modal for add actions (transaction / account) */}
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      {location.pathname === "/" ? (
        <NewTransactionForm onClose={() => setIsModalOpen(false)} />
      ) : (
        <NewAccountForm onClose={() => setIsModalOpen(false)} />
      )}
    </Modal>
    </div>
  );
};

export default Layout;

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>This is your dashboard page.</p>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default DashboardPage;

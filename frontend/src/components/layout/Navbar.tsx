import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  return (
    <nav>
      <div className="container">
        <div className="logo">
          <Link to="/">Full-Stack App</Link>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

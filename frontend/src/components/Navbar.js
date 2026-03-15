import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (

    <div className="navbar">

      <div className="nav-left">

        <Link to="/">Home</Link>

        {token && (
          <Link to="/ask">Ask Question</Link>
        )}

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

      </div>


      
      {token && (
        <div className="nav-right">

          <Link to="/profile" className="profile-icon">
            <FaUserCircle />
          </Link>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>

        </div>
      )}

    </div>

  );
}

export default Navbar;
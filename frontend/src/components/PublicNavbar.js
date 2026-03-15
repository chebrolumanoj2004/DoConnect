import "./PublicNavbar.css";
import logo from "../assets/Logo.svg";
function PublicNavbar() {

  return (

    <div className="publicnavbar">

      <div className="brand">

    <img src={logo} alt="DoConnect Logo" className="logo-img" />

    <span className="logo-text">DoConnect</span>
    </div>

    </div>

  );

}

export default PublicNavbar;
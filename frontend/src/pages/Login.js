import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

import images1 from "../assets/images1.png";
import images2 from "../assets/images2.png";
import images3 from "../assets/images3.png";
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const images = [
    images1, images2, images3
  ];

  const [currentImage, setCurrentImage] = useState(0);

   useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage((prev) => (prev + 1) % images.length);

    }, 3000);

    return () => clearInterval(interval);

  }, [images.length]);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      navigate("/");
      window.location.reload();

    } catch {

      alert("Invalid credentials");

    }

  };


  return (

    <div className="login-page">

      <div className="login-card">

      
        <div className="login-left">

          <img
            src={images[currentImage]}
            alt="carousel"
          />

        </div>


      
        <div className="login-right">

          <h2>Welcome Back</h2>
          <p>Login to access your account</p>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <button type="submit">
              Login
            </button>

          </form>

          <p className="register-link">
            New user? <Link to="/register">Create Account</Link>
          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;
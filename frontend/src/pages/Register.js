
import { useState , useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Register.css";

import images1 from "../assets/images1.png";
import images2 from "../assets/images2.png";
import images3 from "../assets/images3.png";
function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const images = [
  images1,
  images2,
  images3
];
const [currentImage, setCurrentImage] = useState(0);

  
  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage((prev) => (prev + 1) % images.length);

    }, 3000);

    return () => clearInterval(interval);

  }, [images.length]);

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Registration successful!");

      navigate("/login");

    } catch (error) {

      alert("Registration failed");

    }

  };

  return (

    <div className="register-container">

      <div className="register-card">

        
        <div className="register-left">
<img
  src={images[currentImage]}
  alt="carousel"
/>

        </div>

        <div className="register-right">

          <h2>Create Account</h2>

          <p>Register to start asking questions</p>

          <form onSubmit={handleRegister}>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Register</button>

          </form>

          <p className="login-link">
            Already registered? <Link to="/login">Login</Link>
          </p>

        </div>

      </div>

    </div>

  );

}

export default Register;
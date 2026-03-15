import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicNavbar from "./components/PublicNavbar";
import Navbar from "./components/Navbar";

import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AskQuestion from "./pages/AskQuestion";
import QuestionDetails from "./pages/QuestionDetails";

function App() {

  const token = localStorage.getItem("token");

  return (

    <BrowserRouter>

     
      {token ? <Navbar /> : <PublicNavbar />}

      <Routes>

       
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to="/login" />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/ask"
          element={token ? <AskQuestion /> : <Navigate to="/login" />}
        />

        <Route
          path="/question/:id"
          element={token ? <QuestionDetails /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;
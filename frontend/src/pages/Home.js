import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {

  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    const fetchQuestions = async () => {

      const role = localStorage.getItem("role");
      const token = localStorage.getItem("token");

      let res;

      if (role === "admin") {

        res = await API.get("/questions/admin/all", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      } else {

        res = await API.get("/questions");

      }

      setQuestions(res.data);

    };

    fetchQuestions();

  }, []);

  const approveQuestion = async (id) => {

    const token = localStorage.getItem("token");

    await API.put(
      `/questions/approve/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    window.location.reload();

  };

  const declineQuestion = async (id) => {

    const token = localStorage.getItem("token");

    await API.delete(
      `/questions/decline/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    window.location.reload();

  };

  

  const resolveQuestion = async (id) => {

    const token = localStorage.getItem("token");

    await API.put(
      `/questions/resolve/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    window.location.reload();

  };

  const role = localStorage.getItem("role");

  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div className="home-container">

      <h2>All Questions</h2>

   

      <div className="search-box">
        <span className="search-icon">🔍</span>

        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredQuestions.map((q) => (

        <div key={q._id} className="question-card">

          <Link to={`/question/${q._id}`}>
            <h3>{q.title}</h3>
          </Link>

          <p>{q.description}</p>

          {!q.approved && (
            <p className="pending">Pending Approval</p>
          )}

        

          {q.status === "resolved" && (
            <p className="resolved">Discussion Closed</p>
          )}

         {role === "admin" && (

  <div className="admin-buttons">

    {!q.approved && (
      <>
        <button onClick={() => approveQuestion(q._id)}>
          Approve
        </button>

        <button
          className="decline-btn"
          onClick={() => declineQuestion(q._id)}
        >
          Decline
        </button>
      </>
    )}

    {q.approved && q.status !== "resolved" && (
      <button
        className="resolve-btn"
        onClick={() => resolveQuestion(q._id)}
      >
        Resolve
      </button>
    )}

  </div>

)}
        </div>

      ))}

    </div>

  );

}

export default Home;
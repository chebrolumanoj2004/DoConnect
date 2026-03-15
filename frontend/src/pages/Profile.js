import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "./Home.css";   

function Profile() {

  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const profileRes = await API.get("/auth/profile", config);
        setUser(profileRes.data);

        const questionsRes = await API.get("/questions/my-questions", config);
        setQuestions(questionsRes.data);

      } catch (error) {

        console.error("Profile fetch error:", error);

      }

    };

    fetchData();

  }, []);


  if (!user) return <h2>Loading...</h2>;


  return (

    <div className="home-container">

      <h2>User Profile</h2>

<div className="profile-card">

  <p><b>Name:</b> {user.name}</p>
  <p><b>Email:</b> {user.email}</p>

</div>

<hr />
      <h3>My Questions</h3>

      {questions.length === 0 ? (

  <p>No questions posted</p>

) : (

  questions.map((q) => (

    <div key={q._id} className="question-card">

      <Link to={`/question/${q._id}`}>
        <h3>{q.title}</h3>
      </Link>

      {/* ⭐ Pending Approval */}

      {!q.approved && (
        <p style={{color:"orange", marginTop:"8px"}}>
          Pending for approval
        </p>
      )}

      {/* ⭐ Approved Question Logic */}

      {q.approved && (

        q.answers && q.answers.length > 0 ? (

          <div style={{ marginTop: "10px" }}>

            <b>Answers:</b>

            <ul style={{ marginTop: "5px" }}>

              {q.answers.map((a) => (
                <li key={a._id}>{a.answer}</li>
              ))}

            </ul>

          </div>

        ) : (

          <p style={{marginTop:"8px"}}>
            No answers yet
          </p>

        )

      )}

    </div>

  ))

)}

    </div>

  );

}

export default Profile;
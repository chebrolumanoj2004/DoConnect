import { useState } from "react";
import API from "../services/api";
import "./AskQuestion.css";

function AskQuestion() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/questions/ask",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Question posted successfully");

      setTitle("");
      setDescription("");

    } catch (error) {

      console.error(error);
      alert("Failed to post question");

    }

  };

  return (

    <div className="ask-container">

      <h2>Ask Question</h2>

      <div className="ask-card">

        <input
          className="ask-input"
          type="text"
          placeholder="Enter your question title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="ask-textarea"
          rows="6"
          placeholder="Describe your question in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="ask-btn"
          onClick={handleSubmit}
        >
          Post Question
        </button>

      </div>

    </div>

  );
}

export default AskQuestion;
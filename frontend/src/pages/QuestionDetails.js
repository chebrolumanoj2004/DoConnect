import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { FaHeart } from "react-icons/fa";
import "./QuestionDetails.css";

function QuestionDetails() {

  const { id } = useParams();

  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");
  const [comments, setComments] = useState({});
  const [commentTexts, setCommentTexts] = useState({});
  const [question, setQuestion] = useState(null);   

  useEffect(() => {

    const fetchData = async () => {

      
      const questionRes = await API.get(`/questions/${id}`);
      setQuestion(questionRes.data);

    
      const res = await API.get(`/answers/${id}`);
      setAnswers(res.data);

    
      res.data.forEach(async (a) => {

        const commentRes = await API.get(`/comments/${a._id}`);

        setComments(prev => ({
          ...prev,
          [a._id]: commentRes.data
        }));

      });

    };

    fetchData();

  }, [id]);

  const postAnswer = async () => {

    const token = localStorage.getItem("token");

    await API.post(
      "/answers/post",
      {
        questionId: id,
        answer: answerText
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    window.location.reload();

  };

  const likeAnswer = async (answerId) => {

    if (question?.status === "resolved") return;

    try {

      const token = localStorage.getItem("token");

      await API.put(
        `/answers/like/${answerId}`,
        {},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      window.location.reload();

    } catch (error) {

      alert(error.response?.data?.message || "Already liked");

    }

  };

  const addComment = async (answerId) => {

    if (question?.status === "resolved") return;

    await API.post("/comments/add", {
      answerId: answerId,
      comment: commentTexts[answerId]
    });

    setCommentTexts(prev => ({
      ...prev,
      [answerId]: ""
    }));

    window.location.reload();

  };

  return (

    <div className="answers-page">

      <h2 className="answers-title">Answers</h2>

     

      {question?.status === "resolved" && (
        <p className="discussion-closed">
          ⚠ This discussion has been closed by admin
        </p>
      )}

      {answers.map((a) => (

        <div key={a._id} className="answer-card">

          <p className="answer-text">{a.answer}</p>

          <div className="like-section">

            <button
              className="like-btn"
              disabled={question?.status === "resolved"}
              onClick={() => likeAnswer(a._id)}
            >
              <FaHeart className="heart-icon" />
            </button>

            <span className="like-count">{a.likes} likes</span>

          </div>

          <div className="comments-section">

            <h4>Comments</h4>

            {(comments[a._id] || []).map((c) => (
              <p key={c._id} className="comment-item">
                • {c.comment}
              </p>
            ))}

          

            {question?.status !== "resolved" && (

              <div className="comment-box">

                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentTexts[a._id] || ""}
                  onChange={(e)=>
                    setCommentTexts({
                      ...commentTexts,
                      [a._id]: e.target.value
                    })
                  }
                />

                <button onClick={()=>addComment(a._id)}>
                  Comment
                </button>

              </div>

            )}

          </div>

        </div>

      ))}

      

      {question?.status !== "resolved" && (

        <div className="post-answer">

          <h3>Post Your Answer</h3>

          <textarea
            rows="4"
            placeholder="Write your answer..."
            value={answerText}
            onChange={(e)=>setAnswerText(e.target.value)}
          />

          <button onClick={postAnswer}>
            Submit Answer
          </button>

        </div>

      )}

    </div>

  );

}

export default QuestionDetails;
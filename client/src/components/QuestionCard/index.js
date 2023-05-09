import { React, useState } from "react";
import { Link } from "react-router-dom";
import PopupForm from "../PopupForm";

import userImg from "../../img/user.svg";

import "./style.css";

function QuestionCard({
  _id,
  user,
  feature,
  impactRegion,
  notes,
  createdAt,
  updatedAt,
  isEditing,
  deleteQuestion,
}) {
  const [showPopup, setShowPopup] = useState(false);

  function onClose() {
    setShowPopup(false);
  }

  function MainContent() {
    return (
      <>
        <div className="questioncard_user-data">
          <img src={userImg} alt="user" className="questioncard_img" />
          <p className="questioncard_text">{user.name}</p>
        </div>

        <div className="questioncard_date">
          {createdAt && (
            <p className="questioncard_text-small">
              {new Date(createdAt).toDateString()}
            </p>
          )}
          {updatedAt &&
          createdAt &&
          new Date(updatedAt).getTime() !== new Date(createdAt).getTime() ? (
            <p className="questioncard_text-small">(Edited)</p>
          ) : null}
        </div>
        <div className="question_text-wrapper">
          <div className="questioncard_text-wrapper">
            {feature &&
              feature.split("\n").map((text, index) => (
                <p key={index} className="questioncard_text">
                  {text}
                </p>
              ))}
          </div>

          <div className="questioncard_topic">
            {impactRegion &&
              impactRegion.split("\n").map((text, index) => (
                <p key={index} className="questioncard_text">
                  {text}
                </p>
              ))}
          </div>

          <div className="questioncard_topic">
            {notes &&
              notes.split("\n").map((text, index) => (
                <p key={index} className="questioncard_text">
                  {text}
                </p>
              ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="questioncard_container">
        {isEditing && (
          <div className="questioncard_edit-icon">
            <Link to={`/user/edit/question/${_id}`}>
              <i className="fas fa-edit"></i>
            </Link>
          </div>
        )}
        {showPopup && 
          <PopupForm onClose={onClose}><MainContent/></PopupForm>
        }
        <MainContent/>
          <div className="questionCard_btn">
            <button onClick={()=>setShowPopup(true)}>Read More</button>
          </div>
        {isEditing && (
          <>
            <div className="questioncard_edit-icon ">
              <i
                className="fas fa-trash-alt"
                onClick={() => {
                  deleteQuestion(_id);
                }}
              ></i>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default QuestionCard

import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import SquareLoader from "../../components/SquareLoader";
import Form from "../../components/Form"
import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";
import Dropdown from "../../components/DropDown";

import "./style.css"

function AddQuestion() {

   const [selectedParentFolder, setSelectedParentFolder] = useState('');
   const [selectedSubFolder, setSelectedSubFolder] = useState('');
 
   const handleSelect = (parentFolderId, subFolderId) => {
      setSelectedParentFolder(parentFolderId);
      setSelectedSubFolder(subFolderId);
    
      setQuestion({
        ...question,
        parentFolderId: parentFolderId,
        subFolderId: subFolderId
      });
    }
    

   const [loading, setLoading] = useState(false);

   const [question, setQuestion] = useState({
      feature: "",
      impactRegion: "",
      notes: "",
      parentFolderId : "",
      subFolderId:""
   });

   const history = useHistory();

   let validateForm = () => {
      if (question.impactRegion && question.feature && question.notes) {
         return true;
      } else {
         return false;
      }
   }

   let submitQuestion = () => {
      if (validateForm()) {
         setLoading(true);
         API.addMyQuestion(question)
            .then((res) => {
               setLoading(false);
               if (res.data.status === "success") {
                  errorHandler(false,
                     res.data.msg
                  ).then(() => { history.push("/user/myQuestions"); });
               }
               else {
                  errorHandler(true, res.data.msg)
               }
            })
            .catch((res) => {
               setLoading(false)
               res = res.response
               if (res.data && res.data.msg) {
                  errorHandler(true, res.data.msg);
               } else {
                  errorHandler(true);
               }
            });
      }
   }


   return (<>
      <SquareLoader loading={loading} />
      <div className="question_wrapper">
         <div className="question_container">
            <Form question={question} setQuestion={setQuestion}
            />
            <Dropdown onSelect={handleSelect} />

            <button onClick={submitQuestion} className="question_button">Add impact Region</button>
         </div>
      </div>
   </>);

}

export default AddQuestion;
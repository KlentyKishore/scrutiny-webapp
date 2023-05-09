import React from "react";
import { useState, useEffect } from "react";
import QuestionCard from "../../components/QuestionCard";
import axios from 'axios';
const token = localStorage.getItem('token');
import "./style.css";

function MyQuestion() {

  const [parentFolders, setParentFolder] = useState([]);
  const [subFolders, setSubFolders] = useState([]);
  const [selectedParentFolder, setSelectedParentFolder] = useState(null);
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    axios.get('/user/getParentFolder/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        const folders = response.data.msg.map(folder => {
          return {
            id: folder._id,
            name: folder.folderName
          };
        });
        setParentFolder(folders);
      })
      .catch(error => console.error(error));
  }, []);


  const handleClick = (parentFolder) => {
    console.log("parentFolder", parentFolder)
    axios.get(`/user/getSubfolder/${parentFolder.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setSubFolders(res.data.msg);
      setSelectedParentFolder(parentFolder);
      setQuestions(null)
    });
  };

  const handleSubFolderClick = (subFolder) => {
    console.log("subFolder", subFolder)
    axios.get(`/user/getQuestions/${subFolder._id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      console.log("res.data.msg", res.data.questions)
      setQuestions(res.data.questions);
    });
  }


  return (
    <div>
      <h1>Parent Folders</h1>
      <ul>
        {parentFolders.map((parentFolder) => (
          <li key={parentFolder._id} onClick={() => handleClick(parentFolder)}>
            {parentFolder.name}
          </li>
        ))}
      </ul>
      {selectedParentFolder && (
        <div>
          <h2>Subfolders</h2>
          <ul>
            {subFolders.map((subFolder) => (
              <li key={subFolder.id} onClick={() => handleSubFolderClick(subFolder)}>
                {subFolder.folderName}
              </li>
            ))}
          </ul>
        </div>
      )}

      {questions && (
        <div>
          <h2> Questions </h2>
          <ul>
            {questions.map((question) => (
              <QuestionCard _id={question._id} user={question.user.name} feature={question.feature} impactRegion={question.impactRegion} notes={question.notes} createdAt={question.createdAt} />
            ))}
          </ul>
        </div>
      )}

    </div>
  );

}

export default MyQuestion;
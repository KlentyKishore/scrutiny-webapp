import React from "react";
import {useState,useEffect} from "react";
import {useHistory ,useParams} from "react-router-dom";

import SquareLoader from  "../../components/SquareLoader";

import Form from "../../components/Form"

import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";

function EditQuestion() {

   const [loading,setLoading]=useState(true);

   const [isError,setIsError] = useState(false)

   const [question,setQuestion]=useState({
    feature:"",
    impactRegion:"",
    notes:""
 });

   const history = useHistory();

   const {QUESTION_ID} = useParams();

   useEffect(()=>{
     API.getMyQuestion(QUESTION_ID)
        .then((res)=>{
            setLoading(false);
            if(res.data.status==="sucess"){
                setQuestion(res.data.question);
            }else{
              setIsError(true)
            }
        })
        .catch((res)=>{
          setLoading(false);
          res=res.response
          if(res.data && res.data.msg){
              errorHandler(true,res.data.msg);
          }else{
            errorHandler(true);
            console.log(res)
          }
       });
   },[QUESTION_ID])



   let validateForm=()=>{
        if(question){
            return true;
       }
   }

   let onSubmitQuestion=()=>{
      if(validateForm()){
          setLoading(true);
          // let arr_topics=topics.split(",")
          API.updateMyQuestion({question_id:QUESTION_ID,question})
            .then((res)=>{
                   setLoading(false);
                   if(res.data.status==="sucess"){
                     errorHandler(false,
                      res.data.msg
                      ).then(()=>{history.push("/questions");});
                   }
                   else{
                      errorHandler(true,res.data.msg);
                   }
             })
             .catch((res)=>{
                setLoading(false);
                res=res.response
                if(res.data && res.data.msg){
                      errorHandler(true,res.data.msg);
                }else{
                      errorHandler(true);
                }
            });
      }
   }
                      
  const getAcessForQuestion = ()=>{
      API.getAcessForQuestion(QUESTION_ID).then((res)=>{
        if(res){
          errorHandler(false,res.msg)
        }
      })
  }
  return ( <>
            <SquareLoader  loading={loading}/>
            <div className="question_wrapper">
              <div className="question_container">
                  {!isError && 
                      (<>
                        <Form  question={question} setQuestion={setQuestion}/>
                        <button onClick={onSubmitQuestion} className="question_button">update Question</button>
                      </>)
                  }
                  {isError && 
                      <>
                        <p>You have no permission to edit this get acess by clicking below</p>
                        <button onClick={getAcessForQuestion}>Request Acess</button>
                      </>

                  }

                    
              </div>
            </div>
          </>);

}

export default EditQuestion;
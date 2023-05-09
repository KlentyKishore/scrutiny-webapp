import {React} from "react";

function Form({question,setQuestion}) {

   return ( <>
                
             <div  className="question_from">
             <label className="question_label">
             <span>Feature<span className="red_color">*</span></span></label>
                    <div className="question_input-wrapper">
                        <input placeholder="Features"
                              className="question_input" 
                              name="feature"  
                              value={question.feature}
                              onChange={(e)=>{
                                   setQuestion({...question,feature:e.target.value});
                            }}
                          />
                   </div>
             </div> 

            <div  className="question_from">
             <label htmlFor="question" className="question_label">
             <span>Impact Region<span className="red_color">*</span></span></label>
                    <div className="question_input-wrapper">
                        <textarea placeholder="places of impact" 
                              rows="7"
                              cols="24" 
                              name="question"  
                              className="question_textarea" 
                              value={question.impactRegion}
                              onChange={(e)=>{
                                   setQuestion({...question,impactRegion:e.target.value});
                            }}
                          >
                       </textarea>
                   </div>
             </div> 
             <div  className="question_from">
             <label htmlFor="question" className="question_label">
             <span>Notes<span className="red_color">*</span></span></label>
                    <div className="question_input-wrapper">
                        <textarea placeholder="Env,DB etc.. " 
                              rows="7"
                              cols="24" 
                              name="question"  
                              className="question_textarea" 
                              value={question.notes}
                              onChange={(e)=>{
                                   setQuestion({...question,notes:e.target.value});
                            }}
                          >
                       </textarea>
                   </div>
             </div> 
          </>);

}

export default Form;

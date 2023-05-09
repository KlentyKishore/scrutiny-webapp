import {React} from "react";
import {Link } from "react-router-dom"; 


import "./style.css";

function Popup(props){
   
  return ( 
    <>
     <div className="popupWrapper">
      <div className="popupContainer">
        <div className="closeIcon" onClick={props.onClose}>
            X
        </div>
        {props.children }
      </div>
      </div>
    </>);

    }

export default Popup;

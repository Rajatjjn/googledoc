import React from "react";
import { AllIcons } from "./AllDocsIcon";
import './Googledocs.css'


function MapIcon() {
  function handleClick(element) {
    document.execCommand(`${element.action}`);
  }

  return (
    <>
    <div className="mapIcon" >
      {AllIcons.map((element, index) => (
        <button
          onClick={() => handleClick(element)}
          key={index}
          className="allIcons"
        >
          {element.Icons}
        </button>
      ))}
        
    </div>
    
</>
  );
}

export default MapIcon;

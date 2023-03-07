import React, { useRef, useState } from "react";
import "./Googledocs.css";
import MapIcon from "./MapIcon";
import ImageIcon from "@mui/icons-material/Image";
import DownloadIcon from "@mui/icons-material/Download";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import jsPDF from "jspdf";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";

function Googledocs() {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [fontSize, setFontSize] = useState(18);

  function handleColorChange(color) {
    document.execCommand("foreColor", false, color);
  }
  function handleBackColorChange(color) {
    document.execCommand("backColor", false, color);
  }

  const handleFontSizeChange = (e) => {
    setFontSize(parseInt(e.target.value));
  };

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 1);
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => prevSize - 1);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const sheetContent = document.querySelector(".sheet");
    doc.text(sheetContent.innerText, 10, 10);
    doc.save("document.pdf");
  };

  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = document.createElement("img");
      img.src = reader.result;

      img.contentEditable = false;
      const range = window.getSelection().getRangeAt(0);
      range.insertNode(img);
      range.collapse(false);
    };
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };


  return (
    <div className="container">

    {/* // this is the div for top doc icon and text */}

      <div className="documentImg">
        <img
          style={{ width: "30px" }}
          src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
          alt=""
        />
        <text
          style={{
            color: "grey",
            fontSize: "18px",
            margin: "5px",
            fontWeight: "inherit",
          }}
        >
          Untitled document
        </text>
      </div>

      <div className="TopHeaderIcon">
      
        <select
          className="zoom"
          value={zoomLevel}
          onChange={(e) => setZoomLevel(parseInt(e.target.value))}
        >
          <option value={50}>50%</option>
          <option value={75}>75%</option>
          <option value={90}>90%</option>
          <option value={100}>100%</option>
          <option value={125}>125%</option>
          <option value={150}>150%</option>
          <option value={200}>200%</option>
        </select>
        <MapIcon />

        <div>

        <FormatColorTextIcon/>
        <input
          type="color"
          onChange={(event) => handleColorChange(event.target.value)}
          className="colorInput1"
        />
        </div>
        
        <div>
        <AutoFixHighIcon/>
        <input
        
          type="color"
          onChange={(event) => handleBackColorChange(event.target.value)}
          className="colorInput2"
        />
        </div>
        
        <ImageIcon onClick={handleImageClick} />
        &nbsp; &nbsp;
        <button className="minusBtn" onClick={decreaseFontSize}>
          -
        </button>
        <input
          type="number"
          value={fontSize}
          onChange={handleFontSizeChange}
          className="fontSizeInput"
        />
        <button className="plusBtn" onClick={increaseFontSize}>
          +
        </button>
      </div>



      <div className="topsheet">
        <div
          className="sheet"
          contentEditable="true"
          style={{
            color: "black",
            fontSize: `${fontSize}px`,
            transform: `scale(${zoomLevel / 100})`,
            backgroundColor:"green",
            marginTop:
              zoomLevel > 150
                ? "35rem"
                : zoomLevel > 125
                ? "20rem"
                : zoomLevel > 100
                ? "10rem"
                : "0",
          }}
        >
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            style={{ display: "none" }}
            value=""
          />
          <div>
            {image ? (
              <img className="ImageContainer" src={image} alt="uploaded" />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="downloadIcon">
        <DownloadIcon onClick={handleDownloadPDF} />
      </div>
    </div>
  );
}

export default Googledocs;

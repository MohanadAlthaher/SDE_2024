import React from "react";
import "./homePage.css";

const HomePageText = () => {
  return (
    <div className="main-text">
      <div className="text">
        <h1 style={{fontFamily:'Arial',fontSize:'60px'}} className="discover">Discover New Arrivals</h1>
        <p style={{fontFamily:'Arial',fontSize:'23px'}}>Step into the latest trends with our exclusive sneaker collection</p>
        <button className="blue-button">SHOP NOW</button>
      </div>
    </div>
  );
};

export default HomePageText;

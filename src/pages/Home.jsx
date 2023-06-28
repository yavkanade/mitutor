import React from "react";
import "../styles/Home.css";

function Home() {
  return (
    <div className="hero-container">
      <div className="horizontal" />
      <div className="userName">
        <h1>SUKA BLYAT</h1>
        <h3 className="greyColorInfo">about</h3>
      </div>

      <div className="aboutBox">
        <p>im ceool guy my name is maz i like berser autism and kanye </p>
      </div>
      <div className="userPictureHomePage"></div>
      <div className="coursesTutorBox">
        {[...Array(15)].map((_, index) => (
          <div key={index} className="graySquare"></div>
        ))}
      </div>
    </div>
  );
}

export default Home;

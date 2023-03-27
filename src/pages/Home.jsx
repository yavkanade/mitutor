import React from "react";
import "../styles/Home.css";
import fall from "../assets/fall.mp4";

function Home() {
  return (
    <>
      <MainSection />
    </>
  );
}

function MainSection() {
  return (
    <div className="hero-container">
      <h1>MiTutor</h1>
      <p>The student, becomes the teacher</p>
    </div>
  );
}

export default Home;

import React from 'react'
import "./Home.css";
import fall from "../assets/fall.mp4"


function Home () {
    return (
        <>
        <MainSection />
        </>
    )
}


function MainSection(){
    return (
        <div className='hero-container'>
        <video src={fall} autoPlay loop muted />
        <h1>MiTutor</h1>
        <p>Come On and Help Out Today!</p>
    </div>
    )
  }

export default Home; 
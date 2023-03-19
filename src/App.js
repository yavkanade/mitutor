import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Student from './pages/Student.jsx';
import firebase from './firebase';
import Navbar from './navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element = {<Home/>} />
          <Route path="/student"  element = {<Student/>} />
        </Routes>
      </BrowserRouter>

    )
    
}

export default App;

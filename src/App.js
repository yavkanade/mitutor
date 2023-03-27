import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Student from "./pages/Student.jsx";
import firebase from "./firebase";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Tutor from "./pages/Tutor";
import Match from "./pages/Match";
import Login from "./authentication/login";
import UserHomePage from "./pages/UserHomePage";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Student />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/match" element={<Match />} />
        <Route path="/login" element={<Login />} />
        <Route path="/UserHomePage" element={<UserHomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

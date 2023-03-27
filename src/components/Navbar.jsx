import React from "react";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Mi-Tutor</h1>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/student">Student</a>
        </li>
        <li>
          <a href="/tutor">Tutor</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/UserHomePage">log In</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

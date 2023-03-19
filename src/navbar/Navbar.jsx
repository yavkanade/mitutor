import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Mi-Tutor</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/student">Student</a></li>
        <li><a href="/tutor">Tutor</a></li>
        <li><a href="/contact">Contact</a></li>

      </ul>
    </nav>
  );
}

export default Navbar;

import React from "react";
import "../styles/Home.css";
import fall from "../assets/fall.mp4";

import { useState, useEffect } from "react";
import firebase from "../firebase";
import Courses from "./Courses";

export default function UserHomePage() {
  return (
    <div className="match-container">
      <div className="matched-pairs">
        <h1></h1>
      </div>
    </div>
  );
}

// User: {
//   name: { type: String}
//   description: {type: String}
//   username: {type: String}
//   password: {type: String}
//   email: {type: String}
//   courses: {type: Array}
//   }

// Courses: {
//   name: {type: String}
//   faculty: {type: String}
//   professor: {typr: Array}
// }
}
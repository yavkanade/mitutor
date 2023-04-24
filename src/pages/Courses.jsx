import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import "../styles/Courses.css";
import firebase from "../firebase";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [addDescription, setDescription] = useState("");

  const [addCourseName, setCourseName] = useState("");
  const [addFaculty, setFaculty] = useState("");
  const [addStudentCourses, setStudentCourses] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Courses")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setCourses(items);
      });
  }, []);

  function addCourse() {
    firebase
      .firestore()
      .collection("Courses")
      .add({
        Description: addDescription,
        Faculty: addFaculty,
        Name: addCourseName,
      })
      .then(() => {
        console.log("Course added successfully!");
        setCourseName("");
        setDescription("");
        setFaculty([]);
      })
      .catch((error) => {
        console.error("Error adding   : ", error);
      });
  }

  {
    /* .<div className="hero-container">
      <div className="course-page">
        <label className="course-page">Add courses to teach</label>

        <div className="course-container">
          <div className="smoll-box"> Course</div>
          <input type="text" />
          <div className="smoll-box"> Teacher</div>
          <input type="text" />
          <button>add</button>
        </div>
      </div>
    
    .. */
  }

  return (
    <div className="course-page-container">
      <div className="course-page">
        <label className="course-page">courses</label>

        <div className="course-container" key={courses.name}>
          <label className="course-page">|Name|</label>
          <label className="course-page">|Faculty|</label>
          <label className="course-page">|Description|</label>
        </div>
        {courses.map((courses) => (
          <div className="course-container" key={courses.name}>
            <label className="course-page">{courses.Name}</label>

            <label className="course-page">{courses.Faculty}</label>

            <label className="course-page">{courses.Description}</label>
          </div>
        ))}
      </div>

      <div className="course-page">
        <label className="course-page">Add courses to teach</label>

        <div className="course-container">
          <div className="smoll-box"> Course</div>
          <input
            type="text"
            value={addCourseName}
            onChange={(event) => setCourseName(event.target.value)}
          />
          <div className="smoll-box">Faculty</div>
          <input
            type="text"
            value={addFaculty}
            onChange={(event) => setFaculty(event.target.value)}
          />
        </div>
        <div className="course-container">
          <div className="smoll-box"> Description</div>
          <input
            type="text"
            value={addDescription}
            onChange={(event) => setDescription(event.target.value)}
          />

          <button
            onClick={(event) => {
              event.preventDefault();
              addCourse();
            }}
          >
            add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Courses;

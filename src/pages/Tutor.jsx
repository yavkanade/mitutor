import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import "../styles/Tutor.css";

export default function Tutor() {
  const [addTutorName, setAddTutorName] = useState("");
  const [addTutorEmail, setAddTutorEmail] = useState("");
  const [addTutorCourses, setAddTutorCourses] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [deleteTutorName, setDeleteTutorName] = useState("");
  const [deleteTutorEmail, setDeleteTutorEmail] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("Tutors")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setTutors(items);
      });
  }, []);

  function addTutor() {
    firebase
      .firestore()
      .collection("Tutors")
      .add({
        name: addTutorName,
        email: addTutorEmail,
        Courses: addTutorCourses,
      })
      .then(() => {
        console.log("Tutor added successfully!");
        setAddTutorName("");
        setAddTutorEmail("");
        setAddTutorCourses([]);
      })
      .catch((error) => {
        console.error("Error adding tutor: ", error);
      });
  }

  function handleAddTutorCourseChange(event) {
    const selectedCourses = event.target.value
      .split(",")
      .map((course) => course.trim());
    setAddTutorCourses(selectedCourses);
  }

  function deleteTutor() {
    firebase
      .firestore()
      .collection("Tutors")
      .where("name", "==", deleteTutorName)
      .where("email", "==", deleteTutorEmail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
          console.log("Tutor deleted successfully!");
        });
      })
      .catch((error) => {
        console.error("Error deleting tutor: ", error);
      });
  }

  return (
    <div className="tutor-container">
      <div>
        <h1 className="tutor-heading">Add tutors</h1>
        <form
          className="tutor-form"
          onSubmit={(event) => {
            event.preventDefault();
            addTutor();
          }}
        >
          <label>Name:</label>
          <input
            type="text"
            value={addTutorName}
            onChange={(event) => setAddTutorName(event.target.value)}
          />
          <br />
          <label>Email:</label>
          <input
            type="text"
            value={addTutorEmail}
            onChange={(event) => setAddTutorEmail(event.target.value)}
          />
          <br />
          <label>Courses:</label>
          <textarea
            value={addTutorCourses.join("\n")}
            onChange={handleAddTutorCourseChange}
          ></textarea>
          <br />
          <button type="submit">Add Tutors</button>
        </form>
      </div>

      <div className="tutors-list">
        <h1>Tutors</h1>
        {tutors.map((tutor) => (
          <div className="tutor-item" key={tutor.name}>
            <h2>
              {tutor.name + " ," + tutor.email + " knows " + tutor.Courses}
            </h2>
          </div>
        ))}
      </div>

      <div>
        <h1 className="tutor-heading">Delete Tutor</h1>
        <form
          className="tutor-form"
          onSubmit={(event) => {
            event.preventDefault();
            deleteTutor();
          }}
        >
          <label>Name:</label>
          <input
            type="text"
            value={deleteTutorName}
            onChange={(event) => setDeleteTutorName(event.target.value)}
          />
          <br />
          <label>Email:</label>
          <input
            type="text"
            value={deleteTutorEmail}
            onChange={(event) => setDeleteTutorEmail(event.target.value)}
          />
          <br />
          <button type="submit">Delete Tutor</button>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import "../styles/Match.css";

export default function Match() {
  const [students, setStudents] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Students")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setStudents(items);
      });
  }, []);

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

  useEffect(() => {
    function displayMatches(students, tutors) {
      const matches = [];

      students.forEach((student) => {
        student.Courses.forEach((course) => {
          const matchedTutors = tutors.filter((tutor) =>
            tutor.Courses.includes(course)
          );
          matchedTutors.forEach((tutor) => {
            matches.push({ student: student.name, tutor: tutor.name });
          });
        });
      });

      setMatchedPairs(matches);
    }

    displayMatches(students, tutors);
  }, [students, tutors]);

  return (
    <div className="match-container">
      <div className="matched-pairs">
        {matchedPairs.length > 0 ? (
          <div>
            <h2 className="match-title">Matched Student-Tutor Pairs:</h2>
            <ul>
              {matchedPairs.map((pair, index) => (
                <li key={index}>
                  <span>{pair.student}</span> matched with{" "}
                  <span>{pair.tutor}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="no-matches">No matches found</p>
        )}
      </div>
    </div>
  );
}

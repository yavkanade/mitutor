import React, { useState, useEffect } from 'react';
import firebase from './firebase';

function App() {
  const [students, setStudents] = useState([]);
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('Students').onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setStudents(items);
    });
  }, []);

  useEffect(() => {
    firebase.firestore().collection('Tutors').onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setTutors(items);
    });
  }, []);


  
  

  return (
    <div>
      <h1>Students</h1>
      {students.map((student) => (
        <div key={student.name}>
          <h2>{student.name}</h2>
          {/* <h2>{student.email}</h2> */}
        </div>
      ))}


    <div>
      <h1>Tutors</h1>
      {tutors.map((tutor) => (
        <div key={tutor.name}>
          <h2>{tutor.name + " knows " + tutor.Courses}</h2>
          {/* <h2>{student.email}</h2> */}
        </div>
      ))}
    </div>
    </div>

    

  );
}

export default App;

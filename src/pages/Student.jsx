import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import "./Student.css"


export default function Student(){
  const [students, setStudents] = useState([]);
  const [addStudentName, setStudentName] = useState('');
  const [addStudentEmail, setStudentEmail] = useState('');
  const [addStudentCourses, setStudentCourses] = useState([]);
  const [deleteStudentName, setDeleteStudentName] = useState('');
  const [deleteStudentEmail, setDeleteStudentEmail] = useState('');


  useEffect(() => {
    firebase.firestore().collection('Students').onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setStudents(items);
    });
  }, []);

 
  function addStudent() {
    firebase.firestore().collection('Students').add({
      name: addStudentName,
      email: addStudentEmail,
      Courses: addStudentCourses,

    })
    .then(() => {
      console.log('Student added successfully!');
      setStudentName('');
      setStudentEmail('');
      setStudentCourses([]);
    })
    .catch((error) => {
      console.error('Error adding student: ', error);
    });
  }

  function handleAddStudentCourse(event) {
    const selectedCourses = event.target.value
      .split(',')
      .map(course => course.trim());
    setStudentCourses(selectedCourses);
  } 




  function deleteStudent() {
    firebase.firestore().collection('Students')
      .where('name', '==', deleteStudentName)
      .where('email', '==', deleteStudentEmail)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
          console.log('Student deleted successfully!');
        });
      })
      .catch((error) => {
        console.error('Error deleting tutor: ', error);
      });
  }
  

  return (
      <div className='student-container'>
        <div>
          <h1 className='student-heading'>Add Student</h1>
          <form className="student-form" onSubmit={(event) => { event.preventDefault(); addStudent(); }}>
            <label>Name:</label>
            <input type="text" value={addStudentName} onChange={(event) => setStudentName(event.target.value)} />
            <br />
            <label>Email:</label>
            <input type="text" value={addStudentEmail} onChange={(event) => setStudentEmail(event.target.value)} />
            <br />
            <label>Courses:</label>
            <textarea value={addStudentCourses.join('\n')} onChange={handleAddStudentCourse}></textarea>
            <br />
            <button type="submit">Add Student</button>
          </form>
        </div>

             
        <div className='student-list'>
          <h1>Students</h1>
          {students.map((student) => (
            <div className="student-item" key={student.name}>
              <h2>{student.name + " ," + student.email + " wants to learn " + student.Courses}</h2>
            </div>
          ))}
        </div>


        <div>
          <h1 className="student-heading">Delete Student</h1>
          <form className="student-form" onSubmit={(event) => { event.preventDefault(); deleteStudent(); }}>
            <label>Name:</label>
            <input type="text" value={deleteStudentName} onChange={(event) => setDeleteStudentName(event.target.value)} />
            <br />
            <label>Email:</label>
            <input type="text" value={deleteStudentEmail} onChange={(event) => setDeleteStudentEmail(event.target.value)} />
            <br />
            <button type="submit">Delete Student</button>
          </form>
        </div>



   
    
    
      </div>
    );
    
    
}
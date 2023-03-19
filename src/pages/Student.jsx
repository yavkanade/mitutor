import React, { useState, useEffect } from 'react';
import firebase from '../firebase';


export default function Student(){
  const [addTutorName, setAddTutorName] = useState('');
  const [addTutorEmail, setAddTutorEmail] = useState('');
  const [addTutorCourses, setAddTutorCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [addStudentName, setStudentName] = useState('');
  const [addStudentEmail, setStudentEmail] = useState('');
  const [addStudentCourses, setStudentCourses] = useState([]);
  const [deleteTutorName, setDeleteTutorName] = useState('');
  const [deleteTutorEmail, setDeleteTutorEmail] = useState('');
  const [deleteStudentName, setDeleteStudentName] = useState('');
  const [deleteStudentEmail, setDeleteStudentEmail] = useState('');
  const [matchedPairs, setMatchedPairs] = useState([]);


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

  useEffect(() => {
    function displayMatches(students, tutors) {
      const matches = [];
    
      students.forEach((student) => {
        student.Courses.forEach((course) => {
          const matchedTutors = tutors.filter((tutor) => tutor.Courses.includes(course));
          matchedTutors.forEach((tutor) => {
            matches.push({ student: student.name, tutor: tutor.name });
          });
        });
      });
    
      setMatchedPairs(matches);
    }

    displayMatches(students, tutors);
  }, [students, tutors]);


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

  function addTutor() {
    firebase.firestore().collection('Tutors').add({
      name: addTutorName,
      email: addTutorEmail,
      Courses: addTutorCourses,
    })
    .then(() => {
      console.log('Tutor added successfully!');
      setAddTutorName('');
      setAddTutorEmail('');
      setAddTutorCourses([]);
    })
    .catch((error) => {
      console.error('Error adding tutor: ', error);
    });
  }

  function handleAddStudentCourse(event) {
    const selectedCourses = event.target.value
      .split(',')
      .map(course => course.trim());
    setStudentCourses(selectedCourses);
  } 

  function handleAddTutorCourseChange(event) {
    const selectedCourses = event.target.value
      .split(',')
      .map(course => course.trim());
    setAddTutorCourses(selectedCourses);
  }

  function deleteTutor() {
    firebase.firestore().collection('Tutors')
      .where('name', '==', deleteTutorName)
      .where('email', '==', deleteTutorEmail)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
          console.log('Tutor deleted successfully!');
        });
      })
      .catch((error) => {
        console.error('Error deleting tutor: ', error);
      });
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
      <div>

        <div>
          <h1>Add Student</h1>
          <form onSubmit={(event) => { event.preventDefault(); addStudent(); }}>
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


        <div>
          <h1>Delete Student</h1>
          <form onSubmit={(event) => { event.preventDefault(); deleteStudent(); }}>
            <label>Name:</label>
            <input type="text" value={deleteStudentName} onChange={(event) => setDeleteStudentName(event.target.value)} />
            <br />
            <label>Email:</label>
            <input type="text" value={deleteStudentEmail} onChange={(event) => setDeleteStudentEmail(event.target.value)} />
            <br />
            <button type="submit">Delete Student</button>
          </form>
        </div>

       


        <div>
          <h1>Add tutors</h1>
          <form onSubmit={(event) => { event.preventDefault(); addTutor(); }}>
            <label>Name:</label>
            <input type="text" value={addTutorName} onChange={(event) => setAddTutorName(event.target.value)} />
            <br />
            <label>Email:</label>
            <input type="text" value={addTutorEmail} onChange={(event) => setAddTutorEmail(event.target.value)} />
            <br />
            <label>Courses:</label>
            <textarea value={addTutorCourses.join('\n')} onChange={handleAddTutorCourseChange}></textarea>
            <br />
            <button type="submit">Add Tutors</button>
          </form>
        </div>

        <div>
          <h1>Delete Tutor</h1>
          <form onSubmit={(event) => { event.preventDefault(); deleteTutor(); }}>
            <label>Name:</label>
            <input type="text" value={deleteTutorName} onChange={(event) => setDeleteTutorName(event.target.value)} />
            <br />
            <label>Email:</label>
            <input type="text" value={deleteTutorEmail} onChange={(event) => setDeleteTutorEmail(event.target.value)} />
            <br />
            <button type="submit">Delete Tutor</button>
          </form>
        </div>


    
        <div>
          <h1>Students</h1>
          {students.map((student) => (
            <div key={student.name}>
              <h2>{student.name + " ," + student.email + " wants to learn " + student.Courses}</h2>
            </div>
          ))}
        </div>
    
      
        <div>
          <h1>Tutors</h1>
          {tutors.map((tutor) => (
            <div key={tutor.name}>
              <h2>{tutor.name +" ," + tutor.email + " knows " + tutor.Courses}</h2>
            </div>
          ))}
        </div>


        <div>
          <h1>Matches</h1>
          {matchedPairs.length > 0 ? (
        <div>
          <h2>Matched Student-Tutor Pairs:</h2>
          <ul>
            {matchedPairs.map((pair, index) => (
              <h2 key={index}>
                {pair.student} matched with {pair.tutor}
              </h2>
            ))}
          </ul>
        </div>
      ) : (
        <p>No matches found</p>
      )}
        </div>
    
      </div>
    );
    
    
}
import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import firebase from '../firebase';



export default function Login(){
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = getAuth.onAuthStateChanged((user) => {
          if (user) {
            // User is signed in
            setUser(user);
          } else {
            // User is signed out
            setUser(null);
          }
        });
      
        // Cleanup function to unsubscribe from the listener
        return () => unsubscribe();
      }, []);

      const handleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        getAuth.signInWithPopup(provider);
      };
      
      return (
        <div>
          {user ? (
            <p>Hello, {user.displayName}</p>
          ) : (
            <button onClick={handleSignIn}>Sign in with Google</button>
          )}
        </div>
      );
          }


  
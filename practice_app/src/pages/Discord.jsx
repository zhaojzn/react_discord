import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { onValue, ref, remove } from 'firebase/database';

const Discord = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const query = ref(db, 'users');

    // Fetch data from Firebase and update state
    onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const projectArray = Object.values(data);
        setProjects(projectArray);
      } else {
        setProjects([]); // Set to an empty array if there's no data
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      // Unsubscribe from the Firebase listener
      // This ensures there are no memory leaks
      onValue(query, null);
    };
  }, []);


  const clearMessages = (userId) => {
    console.log("Test")
    const userRef = ref(db, `users/${userId}/messages`);
    
    // Remove all messages for the user
    remove(userRef)
      .then(() => {
        // Update the state to reflect the removal
        setProjects((prevProjects) => {
          return prevProjects.map((project) => {
            if (project.id === userId) {
              project.messages = {}; // Set messages to an empty object
            }
            return project;
          });
        });
      })
      .catch((error) => {
        console.error('Error clearing messages:', error);
      });
  };

  return (
    <div className='h-screen w-screen bg-white'>
      <div className='p-10 bg-bg'>
        <div className='p-10 bg-white'>
          {projects.map((m, index) => (
            <div key={index} className='text-black'>
              {m.id} {/* Assuming started is a boolean */}
              <button className='p-2 bg-black text-white' onClick={() => clearMessages(m.id)} >Clear Messages</button>
              <div className='p-1 bg-white'>
                <p className='text-black'>Message from the map</p>
                {m.messages && Object.values(m.messages).map((message, i) => (
                  <div key={i}>
                    <p>{message.content}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default Discord;

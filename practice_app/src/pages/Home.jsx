import { useState } from 'react'
import { v4 as uuid } from 'uuid';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Navbar from '../components/Navbar';
import Login from '../components/Login';

const Home = () =>{

    return (
      
        <div className="">
          <Navbar/>
          <Login/>
        </div>
      );    
}
export default Home;
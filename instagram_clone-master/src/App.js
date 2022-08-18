import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { auth, db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,onAuthStateChanged,signOut } from "firebase/auth";
import ImageUpload from './ImageUpload';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};






function App() {

  // const classes = style();

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(authUser) => {
      if (authUser) {
        // user has logged in
        console.log(authUser);
        setUser(authUser);

      }
      else {
        // user has logged out
        setUser(null);
      }

    })
    return () => {
      unsubscribe();
    }
  }, [user, username]);


  useEffect(() => {
    onSnapshot(collection(db, 'posts'), (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  })

  const signUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        return updateProfile(authUser, {
          displayName: username,
        })
      })
      .catch((error) => alert(error.message));
  }

  const signIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => alert(error.message))
    setOpenSignIn(false);
  }

  return (
    <div className="app">

      <ImageUpload/>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <form className='app_signup'>

            <center>
              <img src="" alt="Instagram_logo" />

              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>Sign Up</Button>

            </center>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <Box sx={style}>
          <form className='app_signup'>

            <center>
              <img src="" alt="Instagram_logo" />
              <Input
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn}>Sign In</Button>

            </center>
          </form>
        </Box>
      </Modal>

      <div className="app_header">
        <img className="app_headerImage" src="" alt="Instagram_logo" ></img>

      </div>
      {user ? (
        <Button onClick={() => signOut(auth)}>Logout</Button>
      ) : (
        <div className="app_logincontainer">

          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}


      <h1>Bhingies.</h1>

      {
        posts.map(({ id, post }) => (
          <Post key={id} username={post.username} caption={post.caption} avatar={post.avatar} imageUrl={post.imageUrl} />
        ))
      }

    </div>
  );
}

export default App;

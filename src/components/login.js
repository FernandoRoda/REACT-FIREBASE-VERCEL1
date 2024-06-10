import React, { useState } from 'react';
import TextField from '@mui/material/TextField'
import "./Login.css"

import firebase from './firebaseConfig'

import 'firebase/compat/auth'; 

export const Login = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.location.href = "/lista-tarefas"
    } else {
    }
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      await firebase.auth().signInWithPopup(provider)
        .then(() => {
          window.location.href = "/lista-tarefas"
        })
    } catch (error) {
      setError(error.message)
    }
  }

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          window.location.href = "/lista-tarefas"
        })
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCreate = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          window.location.href = "/lista-tarefas"
        })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className='login-container'>
      <h1>Etec AE Tarefas</h1>
      <img alt='logo da etec' src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjrV5DcEma8sEaQPLOOynwdVk9qKPF8LhbENMxEqrw0jAg9rX2KvOyTHK_sDsWqGVndnQyGDC2TU0FlLnmjuGbzvhRtnRP9sL7RRZfRfPYgzi8o2oRfscDokXE5dajgMWvJ7hDbzVHpRPI/s640/logo-etec.png' />
      <TextField
        sx={{width: "100%", marginY: 1}}
        variant='outlined'
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        sx={{width: "100%", marginY: 1}}
        variant='outlined'
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='bLogin' onClick={handleLogin}>Login</button>
      <button className='bLogin' onClick={handleCreate}>cadastrar</button>
      <button className='bLogin' onClick={handleGoogleLogin}><i className="bi bi-google"></i> Login com google</button>
      {error && <p className='login-error'>{error}</p>}

    </div>
  )
}

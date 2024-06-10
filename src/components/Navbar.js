// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from './firebaseConfig'
import 'bootstrap/dist/css/bootstrap.min.css'; // Importe o CSS do Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importe o JavaScript do Bootstrap

const defaultUserIcon = './logo192.png';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
        await firebase.auth().signOut();
    } catch (err) {
        console.error('Erro ao fazer logout:', err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
      {currentUser && (
          <Link className="navbar-brand" to="/perfil">
            <img src={currentUser.photoURL || defaultUserIcon } alt="User" className="rounded-circle" style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }} />
          </Link>
        )}

        {/* <Link className="navbar-brand" to="/lista-tarefas">Tarefas</Link>
        <Link className="navbar-brand" to="/lista-produtos">Tarefas</Link> */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            
          <li className="nav-item">
              <Link className="nav-link" to="/perfil">Perfil</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/lista-tarefas">Lista de Tarefas</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/lista-produtos">Lista de Produtos</Link>
            </li>
                       <li className="nav-item">
              <span className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

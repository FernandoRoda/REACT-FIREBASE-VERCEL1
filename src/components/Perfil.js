import React, { useState, useEffect } from 'react';
import firebase from './firebaseConfig'

import './Perfil.css'

import Navbar from './Navbar'

function ProfilePage() {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        // Verifica se há um usuário autenticado
        firebase.auth().onAuthStateChanged((userAuth) => {
          if (userAuth) {
            // Se o usuário estiver autenticado, obtém os detalhes do perfil
            const { displayName, email, phoneNumber, photoURL, uid } = userAuth;
            setUser({ displayName, email, phoneNumber, photoURL, uid });
          } else {
            // Se não houver usuário autenticado, redireciona para a página de login
            // Você pode redirecionar para onde quiser
            window.location.replace('/');
          }
        });
      };
  
      fetchUser();
    }, []);
  
    if (!user) {
      return <div>Carregando...</div>;
    }
  
    return (
      <div className="profile-container">
        <h1>Perfil do Usuário</h1>
        <Navbar />
  
        <img src={user.photoURL} alt="Foto de perfil" />
        <p>Nome: {user.displayName}</p>
        <p>Email: {user.email}</p>
        <p>Telefone: {user.phoneNumber}</p>
        <p>UID: {user.uid}</p>
      </div>
    );
  }
  
  export default ProfilePage;
  


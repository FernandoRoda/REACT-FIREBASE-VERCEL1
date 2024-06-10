import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth'; 


const firebaseConfig = {
  apiKey: "AIzaSyCp9IwHFCqsr_Kca1ACUDScbynBL0dgtYE",
  authDomain: "react---firebase---vercel.firebaseapp.com",
  databaseURL: "https://react---firebase---vercel-default-rtdb.firebaseio.com",
  projectId: "react---firebase---vercel",
  storageBucket: "react---firebase---vercel.appspot.com",
  messagingSenderId: "374141809598",
  appId: "1:374141809598:web:6edd22daa7bc45ab57ffef"
};

// Inicialize o Firebase
// Delete o Firebase App existente, se existir
if (firebase.apps.length) {
  firebase.apps[0].delete()
    .then(() => {
      console.log('Firebase App excluído com sucesso');
      // Inicialize o Firebase com a nova configuração
      firebase.initializeApp(firebaseConfig);
    })
    .catch(error => {
      console.error('Erro ao excluir o Firebase App:', error);
    });
} else {
  console.log('Nenhum Firebase App encontrado para excluir');
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

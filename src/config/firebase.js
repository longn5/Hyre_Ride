import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBXdkxuWoY7wBMRWF_OjcNzyf1g5S8lG8U',
  authDomain: 'driversforhire-37d4f.firebaseapp.com',
  databaseURL: 'https://driversforhire-37d4f.firebaseio.com',
  projectId: 'driversforhire-37d4f',
  storageBucket: 'driversforhire-37d4f.appspot.com',
  messagingSenderId: '299010724009'
};

firebase.initializeApp(config);

export const database = firebase.database;
export const firebaseAuth = firebase.auth;
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

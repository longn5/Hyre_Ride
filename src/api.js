import { firebaseAuth, facebookAuth } from './config/firebase';

export const loginWithFacebook = () => firebaseAuth().signInWithPopup(facebookAuth);

// // get specified section
// export const getTodoDB = (sectionId) => {
//   return database.ref(`/${sectionId}`).once('value')
// }

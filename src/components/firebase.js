// Initialize Firebase
import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCA2Pkz7-n2hwOyl5TWoGWwp61AZolEhZI",
    authDomain: "faceliftr.firebaseapp.com",
    databaseURL: "https://faceliftr.firebaseio.com",
    projectId: "faceliftr",
    storageBucket: "faceliftr.appspot.com",
    messagingSenderId: "1042413528119"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
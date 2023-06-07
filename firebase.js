import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';


const firebaseConfig = {
    apiKey: "AIzaSyBhGSwgsiF-6ayIUzRbd7y3rj9IS9WmC6c",
    authDomain: "pythonimageupload-99434.firebaseapp.com",
    databaseURL: "https://pythonimageupload-99434-default-rtdb.firebaseio.com",
    projectId: "pythonimageupload-99434",
    storageBucket: "pythonimageupload-99434.appspot.com",
    messagingSenderId: "566073350313",
    appId: "1:566073350313:web:e4c2edcc017ca22a6f71b8",
    measurementId: "G-S9Q2TFVDYL"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export {firebase};

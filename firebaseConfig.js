// Firebase configuration (YOUR VALUES)
const firebaseConfig = {
    apiKey: "AIzaSyDaBP1gqZpyj-lc4h0hQs2CNC-1_BHwWMA",
    authDomain: "projector-app-cb738.firebaseapp.com",
    projectId: "projector-app-cb738",
    storageBucket: "projector-app-cb738.firebasestorage.app",
    messagingSenderId: "612291403914",
    appId: "1:612291403914:web:87649b867a89770c528d73",
    measurementId: "G-YCP8D4VM65"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

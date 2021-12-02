// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKEZ-ST3E-Ie2x5FPQDhMqPIviqELmz3g",
  authDomain: "filmoteka-33be9.firebaseapp.com",
  projectId: "filmoteka-33be9",
  storageBucket: "filmoteka-33be9.appspot.com",
  messagingSenderId: "695282271972",
  appId: "1:695282271972:web:abbc30160e9ddd56ff4ef1",
  measurementId: "G-PXRJCDRZWF"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const authBtn = document.querySelector('.profile-btn');
const signIn = document.querySelector('.backdrop-auth');
const signUp = document.querySelector('.backdrop-auth-reg')
const toReg = document.querySelector('.register-btn');
const toLog = document.querySelector('.login-btn');

const openAuthSighIn = () => {
  signIn.classList.remove('hidden');
}

const toRegForm = () => {
  signIn.classList.add('hidden');
  signUp.classList.remove('hidden');
}

const toLogForm = () => {
  signUp.classList.add('hidden');
  signIn.classList.remove('hidden');
}

authBtn.addEventListener('click', openAuthSighIn);
toReg.addEventListener('click', toRegForm);
toLog.addEventListener('click', toLogForm);
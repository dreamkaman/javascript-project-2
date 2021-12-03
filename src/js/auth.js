// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAKEZ-ST3E-Ie2x5FPQDhMqPIviqELmz3g',
  authDomain: 'filmoteka-33be9.firebaseapp.com',
  projectId: 'filmoteka-33be9',
  storageBucket: 'filmoteka-33be9.appspot.com',
  messagingSenderId: '695282271972',
  appId: '1:695282271972:web:abbc30160e9ddd56ff4ef1',
  measurementId: 'G-PXRJCDRZWF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const authBtn = document.querySelector('.profile-btn');
const authProfileIcon = document.querySelector('.profile-icon');
const signIn = document.querySelector('.backdrop-auth');
const signUp = document.querySelector('.backdrop-auth-reg');
const toReg = document.querySelector('.register-btn');
const toLog = document.querySelector('.login-btn');
const closeLogBtn = document.querySelector('.modal-auth-close-btn');
const closeRegBtn = document.querySelector('.modal-auth-reg-close-btn');

const openAuthSighIn = () => {
  signIn.classList.remove('hidden');
  authProfileIcon.classList.add('active');
};

const toRegForm = () => {
  signIn.classList.add('hidden');
  signUp.classList.remove('hidden');
};

const toLogForm = () => {
  signUp.classList.add('hidden');
  signIn.classList.remove('hidden');
};

const closeLogForm = () => {
  signIn.classList.add('hidden');
  authProfileIcon.classList.remove('active');
};

const closeRegForm = () => {
  signUp.classList.add('hidden');
  authProfileIcon.classList.remove('active');
};

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    signUp.classList.add('hidden');
    signIn.classList.add('hidden');
    authProfileIcon.classList.remove('active');
  }
});

authBtn.addEventListener('click', openAuthSighIn);
toReg.addEventListener('click', toRegForm);
toLog.addEventListener('click', toLogForm);
closeLogBtn.addEventListener('click', closeLogForm);
closeRegBtn.addEventListener('click', closeRegForm);

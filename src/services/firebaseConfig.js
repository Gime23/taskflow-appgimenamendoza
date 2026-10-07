import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDubjgquXDD0pb6ZltdQrjFX4_8nC65CKc",
  authDomain: "taskflow-50715.firebaseapp.com",
  projectId: "taskflow-50715",
  storageBucket: "taskflow-50715.firebasestorage.app",
  messagingSenderId: "161410831394",
  appId: "1:161410831394:web:6f5d15c70d5fa0d34ae67b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
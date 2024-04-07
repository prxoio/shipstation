// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import the authentication module

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3UKZlqkGvhO8sASAVpdX6UDSFc2uXz4M",
  authDomain: "manufi-v2.firebaseapp.com",
  projectId: "manufi-v2",
  storageBucket: "manufi-v2.appspot.com",
  messagingSenderId: "405865261925",
  appId: "1:405865261925:web:582841985b381efe458f8c",
  measurementId: "G-X2JK1NG8TE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize the authentication service
export { auth }; // Export the auth object for use in your application

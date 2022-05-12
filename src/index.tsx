import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlcjxaWQowavl2ZcWMz345-nbmI0Sg6W4",
  authDomain: "disp-final-project.firebaseapp.com",
  projectId: "disp-final-project",
  storageBucket: "disp-final-project.appspot.com",
  messagingSenderId: "84134778900",
  appId: "1:84134778900:web:2e176f09e098d3a2852f01",
  measurementId: "G-0EYW6EBQL8",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <App db={db} />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

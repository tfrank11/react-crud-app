import { useRef, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Firestore } from "@firebase/firestore";
import Navbar from "./components/navbar/Navbar";
import Create from "./pages/Create";
import Read from "./pages/Read";
import Update from "./pages/Update";
import Delete from "./pages/Delete";
import Auth from "./pages/Auth";
import "./App.css";

interface Props {
  db: Firestore;
}

const App: React.FC<Props> = ({ db }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const userUuid = useRef("");

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      userUuid.current = uid;
      setLoggedIn(true);
      setLoading(false);
    } else {
      setLoggedIn(false);
      setLoading(false);
    }
  });

  const authenticatedContent = (
    <div className="flex">
      <div className="ml-[96px]">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={loggedIn && <Navigate to="/create" />} />
        <Route
          path="/create"
          element={<Create db={db} userUuid={userUuid.current} />}
        />
        <Route
          path="/read"
          element={<Read db={db} userUuid={userUuid.current} />}
        />
        <Route
          path="/update"
          element={<Update db={db} userUuid={userUuid.current} />}
        />
        <Route
          path="/delete"
          element={<Delete db={db} userUuid={userUuid.current} />}
        />
      </Routes>
    </div>
  );

  return (
    <div className="">
      {loading && <div className="h-screen w-screen bg-slate-500"> </div>}
      {!loading && loggedIn ? authenticatedContent : <Auth />}
    </div>
  );
};

export default App;

import React from "react";
import Navbar from "./component/Nav/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignPage from "./pages/SignPage";
import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";

import "./App.css";

function App() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route path='/sign' element={<SignPage />} />
          <Route path='/' element={<LoginPage />} />
          <Route path='/board' element={<BoardPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

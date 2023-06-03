import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";

import NavBar from "./components/NavBar";

import "./App.css";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

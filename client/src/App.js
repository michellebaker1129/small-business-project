import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import AdminDashboard from "./views/AdminDashboard";
import AdminClientView from "./views/AdminClientView";
import ClientDashboard from "./views/ClientDashboard";

import NavBar from "./components/NavBar";
import Notification from "./components/Notification";

import "./App.css";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/client/:clientId" element={<AdminClientView />} />
        <Route path="/dashboard" element={<ClientDashboard />} />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>

      <Notification />
    </div>
  );
}

export default App;

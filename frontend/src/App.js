import React from 'react';
import Login from './components/login/login';
import { Routes, Route } from 'react-router-dom';
import LoginUsers from './components/loginUsers/loginUsers';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login/users" element={<LoginUsers />} />
    </Routes>
  );
}

export default App;

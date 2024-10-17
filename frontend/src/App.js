import React from 'react';
import Login from './components/login/login';
import { Routes, Route } from 'react-router-dom';
import LoginUsers from './components/loginUsers/loginUsers';
import Admin from './components/admin/admin';
import User from './components/users/user';
import CategoryPage from './components/categoryPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login/users" element={<LoginUsers />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/usuario" element={<User />} />
      <Route path="/:categoryName" element={<CategoryPage />} />
    </Routes>
  );
}

export default App;

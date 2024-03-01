import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AdminCategory from "./AdminDashboard/AdminCategory/AdminCategory";
import AdminExercises from "./AdminDashboard/AdminExercises/AdminExercises";
import AdminUser from "./AdminDashboard/AdminUser/AdminUser";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Exercises from './pages/Exercises/Exercises';
import UserSideBar from './components/UserSideBar/UserSideBar';
import Schedule from './components/Schedule/Schedule';
import NewLogin from './pages/NewLogin/NewLogin';
import SingleChat from './components/SingleChat/SingleChat';

const AppRoute = () => {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/admin/*" element={<AdminWithSidebar />} />
        <Route path="/user/*" element={<UserWithSidebar />} />
      </Routes>
    </Router>
 );
};

const AdminWithSidebar = () => {
 return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Routes>
        <Route path="categories" element={<ProtectedRoute><AdminCategory /></ProtectedRoute>} />
        <Route path="exercises" element={<ProtectedRoute><AdminExercises /></ProtectedRoute>} />
        <Route path="users" element={<ProtectedRoute><AdminUser /></ProtectedRoute>} />
      </Routes>
    </div>
 );
};

const UserWithSidebar = () => {
  return (
     <div style={{ display: "flex", flexDirection: "row" }}>
       <UserSideBar />
       <Routes>
         <Route path="schedule" element={<Schedule />} />
         <Route path="chat" element={<SingleChat />} />

       </Routes>
     </div>
  );
 };

export default AppRoute;

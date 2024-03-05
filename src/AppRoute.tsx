import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AdminCategory from "./AdminDashboard/AdminCategory/AdminCategory";
import AdminExercises from "./AdminDashboard/AdminExercises/AdminExercises";
import AdminUser from "./AdminDashboard/AdminUser/AdminUser";
import Sidebar from "./components/Sidebar/Sidebar";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Exercises from './pages/Exercises/Exercises';
import UserSideBar from './components/UserSideBar/UserSideBar';
import Schedule from './components/Schedule/Schedule';
import SingleChat from './components/SingleChat/SingleChat';
import RegisterLogin from './pages/RegisterPage/RegisterPage';
import AdminLogin from "./pages/AdminLogin";
import { UserProtectedRoute } from "./utils/ProtectedRoute";
import History from "./History/History";
import './Route.css'
const AppRoute = () => {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<RegisterLogin />} />
        <Route path="/register" element={<RegisterLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/admin/*" element={<AdminWithSidebar />} />
        <Route path="/user/*" element={<UserWithSidebar />} />
      </Routes>
    </Router>
 );
};

const AdminWithSidebar = () => {
 return (
<div className="ROUTE-WRAPPER">
      
      <Sidebar />
      <div className="admin-with-side-wrap" style={{marginLeft:"5rem"}}>
      <Routes>
        <Route path="categories" element={<ProtectedRoute><AdminCategory /></ProtectedRoute>} />
        <Route path="exercises" element={<ProtectedRoute><AdminExercises /></ProtectedRoute>} />
        <Route path="users" element={<ProtectedRoute><AdminUser /></ProtectedRoute>} />
        <Route path="chat" element={<ProtectedRoute><SingleChat /></ProtectedRoute>} />

        
      </Routes>
      </div>
    </div>
 );
};

const UserWithSidebar = () => {
  return (
    <div>
     <div style={{ display: "flex", flexDirection: "row" }}>
       <UserSideBar />
       <Routes>
         <Route path="addschedule" element={<UserProtectedRoute><Schedule /></UserProtectedRoute>} />
         <Route path="history" element={<UserProtectedRoute><History /></UserProtectedRoute>} />
         <Route path="chat" element={<SingleChat />} />

       </Routes>
     </div>
     </div>
  );
 };

export default AppRoute;

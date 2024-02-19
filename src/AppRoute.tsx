import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AdminCategory from "./AdminDashboard/AdminCategory/AdminCategory";
import AdminExercises from "./AdminDashboard/AdminExercises/AdminExercises";
import AdminUser from "./AdminDashboard/AdminUser/AdminUser";
import Sidebar from "./components/Sidebar/Sidebar";

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path="/admin/*" element={<AdminWithSidebar />} />
      </Routes>
    </Router>
  );
};

const AdminWithSidebar = () => {
  return (
    // <div>
    <>
               <div style={{ display: "flex", flexDirection: "row" }}> 

      <Sidebar />

      <Routes>
        <Route path="/categories" element={<AdminCategory />} />
        <Route path="/exercises" element={<AdminExercises />} />
        <Route path="/users" element={<AdminUser />} />

      </Routes>
    </div>
    </>
  );
};

export default AppRoute;

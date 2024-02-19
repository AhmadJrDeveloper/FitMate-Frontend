import Logo from "../../assets/logo.png";
import { FaDumbbell } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

import "./Sidebar.css";
const Sidebar = () => {
  return (
    <div className="row ">
      <div
        className="bg-dark-custom col-auto col-md-2.5 min-vh-100  d-flex justify-content-between flex-column"
        style={{ backgroundColor: "#0A233F" }}
      >
        <div>
          <div className="d-flex justify-content-center">
            <img
              src={Logo}
              alt=""
              style={{
                maxWidth: "10rem",
                height: "auto",
              }}
              className="d-none d-sm-inline"
            />
          </div>
          <a className="text-decoration-none text-white d-flex d-none d-sm-inline align-itemcenter ms-3 mt-2">
            <i className="fs-4 ms-2">
              <span className="ms-2 fs-2 d-none d-sm-inline">
                {" "}
                Hello, Admin
              </span>
            </i>
          </a>
          <hr className="text-secondary d-none d-sm-block" />
          <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
              <Link to="/admin/categories" className="nav-link text-white fs-5"> 
                {/* <i className="bi bi-speedometer2 fs-2"></i> */}
                <FaList className="mini-side-logo" />
                <span className="ms-2 fs-2 d-none d-sm-inline">Categories</span>
              </Link>
            </li>
            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
              <Link to="/admin/exercises" className="nav-link text-white fs-5">
                {/* <i className="bi bi-emoji-running fs-2"></i> */}
                <FaDumbbell className="mini-side-logo" />
                <span className="ms-2 fs-2 d-none d-sm-inline">Exercises</span>
              </Link>
            </li>
            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
              <Link to="/admin/users" className="nav-link text-white fs-5">
                {/* <i className="bi bi-person fs-2"></i> */}
                <FaUser className="mini-side-logo" />
                <span className="ms-2 fs-2 d-none d-sm-inline">Users</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="dropdown open">
          <a
            className="text-decoration-none text-white dropdown-toggle p-3"
            type="button"
            id="triggerId"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="bi bi-person-circle fs-4"></i>{" "}
            <span className="ms-2 fs-4 d-none d-sm-inline">a7mad l sa3ed</span>
          </a>
          <div className="dropdown-menu" aria-labelledby="triggerId">
            <a className="dropdown-item" href="#">
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

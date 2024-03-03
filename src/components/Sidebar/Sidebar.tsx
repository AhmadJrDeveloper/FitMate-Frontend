import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useInfo } from '../../utils/AuthContext';
import { FaDumbbell, FaList, FaUser,FaComments } from 'react-icons/fa';
import Logo from '../../assets/newlogo.jpeg';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const context = useInfo();
  const location = useLocation();

  if (!context) {
    throw new Error('Login component must be used within an AuthProvider');
  }

  const { type, name, setAuth } = context;

  const handleLogout = () => {
    // Clear token and authentication status from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    setAuth(false);
    navigate('/');
  }

  const isActive = (path:any) => {
    return location.pathname === path;
  };

  return (
    <div className="row">
      <div className="position-fixed bg-dark-custom col-auto col-md-12 min-vh-100 d-flex justify-content-between flex-column custom-side">
        <div>
          <div className="d-flex justify-content-center">
            <img
              src={Logo}
              alt=""
              style={{
                maxWidth: '10rem',
                height: 'auto',
              }}
              className="d-none d-sm-inline"
            />
          </div>
          <a className="text-decoration-none text-white d-flex d-none d-sm-inline align-itemcenter ms-3 mt-2">
            <i className="fs-4 ms-2">
              <span className="ms-2 fs-1 d-none d-sm-inline">Hello, {type}</span>
            </i>
          </a>
          <hr className="text-secondary d-none d-sm-block" />
          <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
            {type === 'admin' && (
              <>
                <li className={`nav-item text-white fs-4 my-1 py-2 py-sm-0 ${isActive('/admin/categories') && 'activee'}`}>
                  <Link to="/admin/categories" className="nav-link text-white fs-5">
                    <FaList className="mini-side-logo" />
                    <span className="ms-2 fs-3 d-none d-sm-inline">Categories</span>
                  </Link>
                </li>
                <li className={`nav-item text-white fs-4 my-1 py-2 py-sm-0 ${isActive('/admin/exercises') && 'activee'}`}>
                  <Link to="/admin/exercises" className="nav-link text-white fs-5">
                    <FaDumbbell className="mini-side-logo" />
                    <span className="ms-2 fs-3 d-none d-sm-inline">Exercises</span>
                  </Link>
                </li>
                <li className={`nav-item text-white fs-4 my-1 py-2 py-sm-0 ${isActive('/admin/users') && 'activee'}`}>
                  <Link to="/admin/users" className="nav-link text-white fs-5">
                    <FaUser className="mini-side-logo" />
                    <span className="ms-2 fs-3 d-none d-sm-inline">Users</span>
                  </Link>
                </li>
                <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <Link to="/user/chat" className="nav-link text-white fs-5">
                  <FaComments className="mini-side-logo" />
                  <span className="ms-2 fs-3 d-none d-sm-inline">Chat</span>
                </Link>
              </li>
              </>
            )}
            {type === 'trainer' && (
              <li className={`nav-item text-white fs-4 my-1 py-2 py-sm-0 ${isActive('/admin/exercises') && 'active'}`}>
                <Link to="/admin/exercises" className="nav-link text-white fs-5">
                  <FaDumbbell className="mini-side-logo" />
                  <span className="ms-2 fs-3 d-none d-sm-inline">Exercises</span>
                </Link>
              </li>
            )}
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
            <i className="bi bi-person-circle fs-4"></i>{' '}
            <span className="ms-2 fs-4 d-none d-sm-inline">{name}</span>
          </a>
          <div className="dropdown-menu" aria-labelledby="triggerId">
            <a className="dropdown-item" onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

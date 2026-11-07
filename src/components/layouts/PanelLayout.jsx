import { NavLink } from "react-router-dom";

const PanelLayout = ({ children }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top px-3 shadow-sm">
        <div className="container-fluid">
          <a href="#" className="navbar-brand d-flex align-items-center">
            <i className="bi bi-list h4 m-0"></i>
            <img
              src="https://cdn-icons-png.flaticon.com/256/906/906334.png"
              className="nav-logo mx-2"
              alt="logo"
            />
          </a>
          <div className="d-flex align-items-center">
            <div className="user-dropdown">
              <img
                src="https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg"
                alt="User"
                className="icon-nav-img"
              />
              <div className="user-dropdown-content p-3">
                <div className="text-center">
                  <img
                    src="https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg"
                    className="icon-nav-img mb-2"
                    alt=""
                  />
                  <h6>User Name</h6>
                  <hr className="p-0" />
                </div>
                <a href="/profile" className="side-bar-item">
                  <i className="bi bi-person side-bar-item-icon"></i>
                  <span className="side-bar-item-caption">Profile</span>
                </a>
                <span className="side-bar-item">
                  <i className="bi bi-box-arrow-right side-bar-item-icon"></i>
                  <span className="side-bar-item-caption">Logout</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="side-nav-open">
        <NavLink to="/dashboard" className="side-bar-item mt-2">
          <i className="bi bi-speedometer2 side-bar-item-icon"></i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/users" className="side-bar-item mt-2">
          <i className="bi bi-speedometer2 side-bar-item-icon"></i>
          <span>Users</span>
        </NavLink>

        <NavLink to="/customers" className="side-bar-item mt-2">
          <i className="bi bi-speedometer2 side-bar-item-icon"></i>
          <span>Customers</span>
        </NavLink>

        <NavLink to="/categories" className="side-bar-item mt-2">
          <i className="bi bi-speedometer2 side-bar-item-icon"></i>
          <span>Categories</span>
        </NavLink>

        <NavLink to="/products" className="side-bar-item mt-2">
          <i className="bi bi-speedometer2 side-bar-item-icon"></i>
          <span>Products</span>
        </NavLink>

        <NavLink to="/invoices" className="side-bar-item mt-2">
          <i className="bi bi-speedometer2 side-bar-item-icon"></i>
          <span>Invoices</span>
        </NavLink>
      </div>
      {children}
    </>
  );
};

export default PanelLayout;

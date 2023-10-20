import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

  const token = sessionStorage.getItem("ftbysptoken")
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("ftbysptoken");
    sessionStorage.removeItem("ftbyspuser");
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" href="#">Family Tree</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {token ? (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#q" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Persons
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link to="/newperson" className="dropdown-item">Add a new Person</Link></li>
                    <li><Link to="/listpersons" className="dropdown-item">List all Persons</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link to="tree" className="nav-link" aria-current="page">View Family Tree</Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/login" className="nav-link" aria-current="page">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">Signup</Link>
                </li>
              </ul>
            </>
          )}
          <span className="d-flex" role="search">
            {token ? (
              <>
                <span className="text-secondary me-4 fs-2">Welcome {sessionStorage.getItem("ftbyspuser")}</span>
                <button className="btn btn-outline-danger" type="submit" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
              </>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
}

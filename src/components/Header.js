import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/LoginActions";

const Header = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const { LoginState } = useSelector((state) => state);
  const { UserState } = useSelector((state) => state);

  const HandleEventLogout=()=>{
    localStorage.removeItem("token")
    dispatch(logout())
    
    console.log("çalşıtt");
    navigate("/")
  }

  return (
    <div className="container px-5 ">
      <nav  className="navbar navbar-expand-lg pt-4 pb-5 px-5">
        <div className="container-fluid">
          <Link className="navbar-brand">my~CV</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              {
                LoginState.success&&(
                  <>
                  <li className="nav-item">
                <Link to="/get-profile" className="nav-link">My Profile</Link>
              </li>
              <li className="nav-item">
                <Link to="/get-cvs" className="nav-link">My Cv's</Link>
              </li>
              <li className="nav-item">
                <Link to="/add-cv" className="nav-link">Add CV</Link>
              </li>
                  </>
                  
                )
              }
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link">Contact</Link>
              </li>
              {LoginState.success ? (
                <>
                <li className="nav-item mx-2">
                  <img style={{height:"40px",borderRadius:"50px"}} src={UserState?.user?.profileImage} alt=""  />
                  
                </li>
                <li className="nav-item ">
                  <button  onClick={HandleEventLogout} className="btn btn-danger nav-link fw-bold"><i className="fa-solid fa-power-off"></i>   Logout</button>
                </li>
                </>
                
              ) : (
                <>
                  
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;

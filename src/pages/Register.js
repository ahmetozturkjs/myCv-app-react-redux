import React, { useEffect, useState } from "react";
import api from "../api/api";
import urls from "../api/urls";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import {
  loginFail,
  loginStart,
  loginSuccess,
} from "../redux/actions/LoginActions";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Regsiter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LoginState = useSelector((state) => state);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    repassword: "",
  });


  //register handle function
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if (formState.password !== formState.repassword) {
      alert("Passwords entered do not match");
      return;
    }
    dispatch(loginStart());
    api
      .post(urls.register, formState)
      .then((res) => {
        switch (res?.data?.status) {
          case 400:
            console.log(res?.data?.message);

            break;
          case 200:
            console.log(res.data);
            navigate("/login");
            break;

          default:
            break;
        }
      })
      .catch((err) => {
        dispatch("REGİSTER SERVER ERROR");
      });
  };

  return (
    <div className="bgdefault">
      <Header />
      <div className="container d-flex justify-content-center mt-5">
        <form onSubmit={handleSubmitRegister} className="w-25 mt-5">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              autoComplete="false"
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              value={formState.password}
              onChange={(e) =>
                setFormState({ ...formState, password: e.target.value })
              }
              autoComplete="false"
              type="password"
              className="form-control"
              id="password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="repassword" className="form-label">
              RePassword
            </label>
            <input
              value={formState.repassword}
              onChange={(e) =>
                setFormState({ ...formState, repassword: e.target.value })
              }
              autoComplete="false"
              type="password"
              className="form-control"
              id="repassword"
            />
          </div>
              <div className="text-center my-5">
              <button type="submit" className="btn buttoncolor">
            Submit
          </button>
              </div>
          
        </form>
      </div>
    </div>
  );
};

export default Regsiter;

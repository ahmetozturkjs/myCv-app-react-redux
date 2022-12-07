import React, { useState } from "react";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginFail,
  loginStart,
  loginSuccess,
} from "../redux/actions/LoginActions";
import { useSelector } from "react-redux";
import api from "../api/api";
import urls from "../api/urls";
import { userFail, userStart, userSuccess } from "../redux/actions/UserAction";
import setHeaderToken from "../api/setHeaderToken";

const Login = () => {
  const { LoginState } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  //login handle function
  const handleSubmitLogin = (e) => {
    e.preventDefault();

    dispatch(loginStart());
    api
      .post(urls.login, formState)
      .then((res) => {
        switch (res?.data?.status) {
          case 400:
            dispatch(loginFail(res?.data?.message));
            console.log(res.data.message);
            break;
          case 200:
            dispatch(loginSuccess(res?.data));
            localStorage.setItem("token", res.data.token);
            dispatch(userStart());
            setHeaderToken();
            api
              .get(urls.getProfile)
              .then((res) => {
                switch (res?.data?.status) {
                  case 400:
                    dispatch(userFail(res?.data?.message));

                    break;
                  case 200:
                    dispatch(userSuccess(res.data.user));

                    break;
                  default:
                    break;
                }
              })
              .catch((res) => {
                dispatch(userFail("LOGIN GETUSER SERVER ERROR"));
              });

            navigate("/");
            break;
          default:
            break;
        }
      })
      .catch((err) => dispatch(loginFail("LOGIN SERVER ERROR")));
  };

  return (
    <div className="bgdefault">
      <Header />
      <div className="container d-flex justify-content-center mt-5">
        <form onSubmit={handleSubmitLogin} className="w-25 mt-5">
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
          <div className="text-center my-5">
            <button type="submit" className="btn buttoncolor">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

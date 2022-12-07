import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../api/api";
import urls from "../api/urls";
import {
  userFail,
  userStart,
  userSuccess,
  userUpdate,
} from "../redux/actions/UserAction";
import setHeaderToken from "../api/setHeaderToken";
import UserBlank from "../assets/images/UserBlank.png";

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { LoginState } = useSelector((state) => state);
  const { UserState } = useSelector((state) => state);
  console.log(UserState);
  const [imageState, setImageState] = useState("");
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
    adress: "",
    phoneNumber: "",
    profileImage:""
  });

  useEffect(() => {
    // if (!LoginState.token) {
    //   navigate("/error");
    // }
    setHeaderToken();
    dispatch(userStart());

    api
      .get(urls.getProfile)
      .then((res) => {
        switch (res.data.status) {
          case 400:
            dispatch(userFail(res?.data?.message));
            break;
          case 200:
            dispatch(userSuccess(res?.data?.user));
            setFormState({
              email: res?.data?.user?.email,
              firstName: res?.data?.user?.firstName,
              middleName: res?.data?.user?.middleName,
              lastName: res?.data?.user?.lastName,
              adress: res?.data?.user?.adress,
              phoneNumber: res?.data?.user?.phoneNumber,
              profileImage:res?.data?.user?.profileImage
            });

            break;
          default:
            break;
        }
      })
      .catch((err) => {
        dispatch(userFail("MY PROFILE GET USER INFI SERVER ERROR"));
      });
  }, []);

  //profile information update
  const handleSubmitUserUpdate = (e) => {
    e.preventDefault();
    api
      .post(urls.updateProfile, formState)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        dispatch(userFail("MYPROFILE UPDATE SERVER ERROR"));
      });
    navigate("/");
  };

  if (!LoginState.success) return;

  return (
    <div className="bgdefault">
      <Header />
      <div className="container">
        <form onSubmit={handleSubmitUserUpdate}>
          <h2 className="text-center my-3">Acount Information</h2>
          <div className="row d-flex justify-content-center ">
            <div className="col-12 col-md-3 ">
              <img
                style={{ width: "100px" }}
                src={
                  formState.profileImage
                    ? formState.profileImage
                    : UserBlank
                }
                className=""
                alt=""
              /><br/>
              <Link className="btn btn-secondary mt-3" to="/upload-profile-photo">Update PP</Link>
            </div>
            <div className="col-12 col-md-3 ">
              <label className="form-label" htmlFor="email">
                Email address
              </label>
              <input
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="form-control"
                type="text"
                id="email"
              />
            </div>
          </div>

          <h2 className="text-center my-3">Personal Information</h2>
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-3">
              <label className="form-label" htmlFor="firstname">
                First Name
              </label>
              <input
                value={formState.firstName}
                onChange={(e) =>
                  setFormState({ ...formState, firstName: e.target.value })
                }
                className="form-control"
                type="text"
                id="firstname"
              />
            </div>
            <div className="col-12 col-md-3">
              <label className="form-label" htmlFor="middlename">
                Middle Name
              </label>
              <input
                value={formState.middleName}
                onChange={(e) =>
                  setFormState({ ...formState, middleName: e.target.value })
                }
                className="form-control"
                type="text"
                id="middlename"
              />
            </div>
            <div className="col-12 col-md-3">
              <label className="form-label" htmlFor="lastname">
                Last Name
              </label>
              <input
                value={formState.lastName}
                onChange={(e) =>
                  setFormState({ ...formState, lastName: e.target.value })
                }
                className="form-control"
                type="text"
                id="lastname"
              />
            </div>
          </div>
          {/* <h2 className="text-center">Contact Information</h2> */}
          <div className="row d-flex justify-content-center">
            {/* <div className="col-12 col-md-3">
              <label className="form-label" htmlFor="adress">
                Adress
              </label>
              <input
                value={formState.adress}
                onChange={(e) =>
                  setFormState({ ...formState, adress: e.target.value })
                }
                className="form-control"
                type="text"
                id="adress"
              />
            </div> */}
            {/* <div className="col-12 col-md-3">
              <label className="form-label" htmlFor="phonenumber">
                Telephone Number
              </label>
              <input
                value={formState.phoneNumber}
                onChange={(e) =>
                  setFormState({ ...formState, phoneNumber: e.target.value })
                }
                className="form-control"
                type="text"
                id="phonenumber"
              />
            </div> */}
          </div>
          <div className="buttondiv d-flex justify-content-center my-5">
            <div className="mx-4">
              <button className="btn btn-success">Update</button>
            </div>
            <div className="mx-4">
              <button className="btn btn-warning">MainPage</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;

import React, { useEffect, useState } from "react";
import api from "../api/api";
import urls from "../api/urls";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import { userFail, userUpdate } from "../redux/actions/UserAction";
import UserBlank from "../assets/images/UserBlank.png";
import setHeaderToken from "../api/setHeaderToken";
import { useNavigate } from "react-router-dom";

const UploadPP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageState, setImageState] = useState("");
  const [userState, setUserState] = useState("");
  const [prewiew, setPrewiew] = useState("");
  const [imageModel, setImageModel] = useState(false);

  setHeaderToken();
  useEffect(() => {
    api
      .get(urls.getProfile)
      .then((res) => {
        switch (res?.data?.status) {
          case 400:
            dispatch(userFail(res?.data?.message));
            console.log("1");
            break;
          case 200:
            setUserState(res?.data?.user);
            console.log("2");
            console.log(res.data);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        dispatch(userFail("UPLOAD PP GET USERINFO SERVER ERROR"));
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    //validation
    if (!imageState) {
      alert("dile didin't select");
      return;
    }
    formData.append("file", imageState);

    api({
      method: "post",
      url: urls.updateProfilePhoto,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        switch (res.data.status) {
          case 400:
            dispatch(userFail(res?.data?.message));
            console.log("çalışı");
            break;
          case 200:
            dispatch(userUpdate(res?.data?.updatedUser));
            window.location.reload();
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log("1");
        dispatch(userFail("UPLOADPP SERVER ERROR"));
      });
    // navigate("/")
  };
  if (!userState) return null;
  return (
    <div className="bgdefault">
      <Header />
      <div className="text-center"
        onClick={() => {
          setImageModel(true);
        }}
      >
        {prewiew ? (
          <img
            style={{ width: "100px", borderRadius: "50%", objectFit: "cover" }}
            srcSet={prewiew}
            className="border "
            alt=""
          />
        ) : (
          <img
            style={{ width: "200px", borderRadius: "50%" }}
            srcSet={userState.profileImage ? userState.profileImage : UserBlank}
            className="border "
            alt=""
          />
        )}
      </div>
      <div className="d-flex justify-content-center">
        <form className="w-25" onSubmit={handleSubmit} action="">
          <div className="mb-3 text-center my-3">
            <label htmlFor="formFile" className="form-label">
              Update Profile Image
            </label>
            <input
              onChange={(e) => {
                setImageState(e.target.files[0]);
                const objURL = URL.createObjectURL(e.target.files[0]);
                setPrewiew(objURL);
              }}
              className="form-control bg-warning"
              type="file"
              id="formFile"
              accept=".png, .jpg, .jpeg"
            />
          </div>
          <div className="text-center">
            <button className="btn btn-success" type="submit">Save</button>
          </div>
        </form>
      </div>
      {imageModel && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100vh",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <img
            style={{ width: "50%", heigth: "100vh" }}
            src={
              imageState
                ? prewiew
                : userState?.profileImage
                ? userState.profileImage
                : UserBlank
            }
            alt=""
          />
          <div style={{position:"absolute",top:"10px",left:"10px",width:"50px",height:"50px"}} onClick={()=>setImageModel(false)}><p>Kapat</p></div>
        </div>
      )}
    </div>
  );
};

export default UploadPP;

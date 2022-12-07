import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Error from "./components/Error";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFail,
  loginStart,
  loginSuccess,
  logout,
} from "./redux/actions/LoginActions";
import api from "./api/api";
import urls from "./api/urls";
import MyProfile from "./pages/MyProfile";
import { userFail, userSuccess } from "./redux/actions/UserAction";
import { useEffect } from "react";
import setHeaderToken from "./api/setHeaderToken";
import MyCvs from "./pages/MyCvs";
import AddCv from "./pages/AddCv";
import UploadPP from "./pages/UploadPP";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { UserState } = useSelector((state) => state);
  useEffect(() => {
    if (!token || token === "") {
      dispatch(logout());
    } else {
      dispatch(loginStart());
      api
        .get(`${urls.verifyToken}/${token}`)
        .then((res) => {
          switch (res?.data?.status) {
            case 400:
             
              dispatch(loginFail(res?.data?.message));
              console.log("server hatası");
           

              break;
            case 200:
              
              dispatch(loginSuccess(res?.data));
              setHeaderToken()
              api
                .get(urls.getProfile)
                .then((res) => {
                  switch (res?.data?.status) {
                    case 400:
                      dispatch(userFail(res?.data?.message));
                  
                      break;
                    case 200:
                      dispatch(userSuccess(res?.data?.user));
                     

                      break;

                    default:
                      break;
                  }
                })
                .catch((err) => {
                  dispatch(userFail(err, "APP GET USER INFO SERVER ERROR"));
                });

              break;
            default:
              break;
          }
        })
        .catch((err) => {
          dispatch(loginFail("SERVER ERROR 404"));
        });
    }
  }, []);


  
   
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<Error />} />
        <Route path="/get-profile" element={<MyProfile />} />
        <Route path="/get-cvs" element={<MyCvs />} />
        <Route path="/add-cv" element={<AddCv />} />
        <Route path="/upload-profile-photo" element={<UploadPP />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

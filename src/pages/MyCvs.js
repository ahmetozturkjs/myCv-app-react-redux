import React, { useEffect } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../api/api";
import urls from "../api/urls";
import { useDispatch } from "react-redux";
import { CvFail, CvStart, CvSuccess } from "../redux/actions/CvActions";
import setHeaderToken from "../api/setHeaderToken";

const MyCvs = () => {
  const dispatch = useDispatch();
  const { UserState } = useSelector((state) => state);
  const { CvState } = useSelector((state) => state);
  console.log(UserState);

  useEffect(() => {
    setHeaderToken();
    dispatch(CvStart());
    api
      .get(urls.getCvs)
      .then((res) => {
        switch (res.data.status) {
          case 400:
            dispatch(CvFail(res.data.message));
            break;
          case 200:
            dispatch(CvSuccess(res.data.cvs));
            console.log(res.data.cvs);
            console.log("başarılı");
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        dispatch(CvFail("MY CV PAGE GET CV SERVER ERROR"));
      });
  }, []);

  console.log("CvState", CvState);
  return (
    <div className="bgdefault">
      <Header />

      {UserState?.user?.cvs?.length < 1 && (
        <h1 className="text-center mt-5">
          You do not have a prepared CV yet. 
          <Link to="/add-cv"> Click to add...</Link>{" "}
        </h1>
      )}
      {UserState?.user?.cvs?.length > 0 && (
        <h3 style={{color:"#6B62D3"}} className="text-center my-4">My Cv's</h3>
      )}
      <div className="row container mx-auto d-flex justify-content-center">
        {CvState?.cv?.map((cv) => {
          return (
            <div key={cv.id} className="col-12 col-md-4 my-3  ">
              <div
                className="card border-0"
                style={{ width: "100%", backgroundColor: "#b1a46076" }}
              >
                <div className="card-body">
                  <h5 style={{color:"#BE925A"}} className="text-center card-title fw-bold">{cv.name}</h5>
                  <h6 > {cv.jobTitle}</h6>
                  <h6> {cv.email}</h6>
                  <p className="card-text"></p>
                  <div className="text-center">
                  <Link style={{color:"white", backgroundColor: "#C69749"}} className="btn ">Cv Details</Link>
                  </div>
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCvs;

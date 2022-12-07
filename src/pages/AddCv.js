import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CvFail, CvStart, CvSuccess } from "../redux/actions/CvActions";
import api from "../api/api";
import urls from "../api/urls";

const AddCv = () => {
  const dispatch = useDispatch();
  const { UserState } = useSelector((state) => state);
  const {CvState}=useSelector((state=>state))
  const [cvForm, setCvForm] = useState({
    name: "",
    jobTitle: "",
    email: "",
    phone: "",
    adress: "",
    personalDescription: "",
    educations: [],
  });

  const [educationForm, setEducationForm] = useState({
    scholl: "",
    department: "",
    graduationyear: "",
    graduationdegree: "",
    city: "",
    country: "",
  });
  // education add function
  const AddEducation = () => {
    setCvForm({
      ...cvForm,
      educations: [...cvForm.educations, educationForm],
    });
    console.log(cvForm);

    setEducationForm({
      scholl: "",
      department: "",
      graduationyear: "",
      graduationdegree: "",
      city: "",
      country: "",
    });
  };

  //cv add function

  const HandleSubmitCv = (e) => {
    e.preventDefault();
    console.log("girdi");
    dispatch(CvStart());
    api
      .post(urls.addCv, cvForm)
      .then((res) => {
        switch (res.data.status) {
          case 400:
            dispatch(CvFail(res.data.message));
            console.log("çalıştı");
            break;
          case 200:
            dispatch(CvSuccess(res.data.cv));
            console.log("çalıştı");
            break;

          default:
            break;
        }
      })
      .catch((err) => {});
  };

  console.log("CvState",CvState);
  return (
    <div className="bgdefault">
      <Header />
      <div className="container">
        <form onSubmit={HandleSubmitCv} action="">
          <h3 className="text-center my-3">Personal Information</h3>

          <div className="d-flex ">
            <div className="mb-3 w-50 mx-3">
              <input
                value={cvForm.name}
                onChange={(e) => {
                  setCvForm({ ...cvForm, name: e.target.value });
                }}
                placeholder="Cv Tag"
                type="text"
                className="form-control"
                id="cvtag"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 w-50 mx-3">
              <input
                value={cvForm.jobTitle}
                onChange={(e) => {
                  setCvForm({ ...cvForm, jobTitle: e.target.value });
                }}
                placeholder="Job Title"
                type="text"
                className="form-control"
                id="jobtitle"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div className="d-flex ">
            <div className="mb-3 w-50 mx-3">
              <input
              style={{backgroundColor:"#ecef58"}}
                value={cvForm.email}
                onChange={(e) => {
                  setCvForm({ ...cvForm, email: e.target.value });
                }}
                placeholder="E-mail"
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 w-50 mx-3">
              <input
                value={cvForm.phone}
                onChange={(e) => {
                  setCvForm({ ...cvForm, phone: e.target.value });
                }}
                placeholder="Phone"
                type="text"
                className="form-control"
                id="phone"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div className="d-flex ">
            <div className="mb-3 w-100 mx-3">
              <input
                value={cvForm.adress}
                onChange={(e) => {
                  setCvForm({ ...cvForm, adress: e.target.value });
                }}
                placeholder="Adress"
                type="text"
                className="form-control"
                id="adress"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div className="d-flex ">
            <div className="mb-3 w-100 mx-3">
              <textarea style={{backgroundColor:"#ecef58"}}
                value={cvForm.personalDescription}
                onChange={(e) => {
                  setCvForm({ ...cvForm, personalDescription: e.target.value });
                }}
                placeholder="Write a cover letter introducing yourself..."
                type="text"
                className="form-control"
                id="personaldescription"
                aria-describedby="emailHelp"
                cols="10"
                rows="5"
              />
            </div>
          </div>
          <h3 className="text-center my-3">Education Information</h3>
          {cvForm.educations.length > 0 &&
            cvForm.educations?.map((edu) => {
              const edId = String(new Date().getTime());
              return (
                <div key={edId}>
                  <div className="d-flex ">
                    <div className="mb-3 w-50 mx-3">
                      <input
                        value={edu.scholl}
                        disabled
                        placeholder="-"
                        type="text"
                        className="form-control"
                        id="schollname"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3 w-50 mx-3">
                      <input
                        value={edu.department}
                        disabled
                        placeholder="-"
                        type="text"
                        className="form-control"
                        id="department"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                  <div className="d-flex ">
                    <div className="mb-3 w-50 mx-3">
                      <input
                        value={edu.graduationyear}
                        disabled
                        placeholder="-"
                        type="text"
                        className="form-control"
                        id="graduationyear"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3 w-50 mx-3">
                      <input
                        value={edu.graduationdegree}
                        disabled
                        placeholder="-"
                        type="text"
                        className="form-control"
                        id="graduationdegree"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                  <div className="d-flex ">
                    <div className="mb-3 w-50 mx-3">
                      <input
                        value={edu.city}
                        disabled
                        placeholder="-"
                        type="text"
                        className="form-control"
                        id="city"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3 w-50 mx-3">
                      <input
                        value={edu.country}
                        disabled
                        placeholder="-"
                        type="text"
                        className="form-control"
                        id="country"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
          <div className="d-flex ">
            <div className="mb-3 w-50 mx-3">
              <input
                value={educationForm.scholl}
                onChange={(e) =>
                  setEducationForm({ ...educationForm, scholl: e.target.value })
                }
                placeholder="Scholl Name"
                type="text"
                className="form-control"
                id="schollname"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 w-50 mx-3">
              <input
                value={educationForm.department}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    department: e.target.value,
                  })
                }
                placeholder="Department"
                type="text"
                className="form-control"
                id="department"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div className="d-flex ">
            <div className="mb-3 w-50 mx-3">
              <input
                value={educationForm.graduationyear}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    graduationyear: e.target.value,
                  })
                }
                placeholder="Graduation Year"
                type="text"
                className="form-control"
                id="graduationyear"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 w-50 mx-3">
              <input
                value={educationForm.graduationdegree}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    graduationdegree: e.target.value,
                  })
                }
                placeholder="Graduation Degree"
                type="text"
                className="form-control"
                id="graduationdegree"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div className="d-flex ">
            <div className="mb-3 w-50 mx-3">
              <input
                value={educationForm.city}
                onChange={(e) =>
                  setEducationForm({ ...educationForm, city: e.target.value })
                }
                placeholder="City"
                type="text"
                className="form-control"
                id="city"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 w-50 mx-3">
              <input
                value={educationForm.country}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    country: e.target.value,
                  })
                }
                placeholder="Country"
                type="text"
                className="form-control"
                id="country"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div className="text-center">
          <button className="btn btn-success" onClick={AddEducation} type="button">
            Add Scholl
          </button>
          </div>
          
          <br />
          <div className="text-center">
          <button className="btn btn-success" type="submit">Cv Add</button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default AddCv;

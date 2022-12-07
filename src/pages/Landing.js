import React from "react";
import Header from "../components/Header";

const Landing = () => {
  return (
    <div className="bgdefault">
      <Header />
      <div className="container">
        <div className="d-flex flex-column justify-content-center mt-5">
          <h1 className="mx-auto">CV Examples & Blank Templates </h1>
          <p  className="mx-auto text-center px-5 w-75 my-3">Increase your chances of getting hired by using professionally prepared CV samples. Having trouble preparing your resume? Get inspired by looking at the templates below!</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;

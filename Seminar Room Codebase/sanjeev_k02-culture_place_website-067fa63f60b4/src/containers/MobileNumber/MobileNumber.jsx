import React, { useState } from "react";
import "./MobileNumber.css";
import API from "../../config/env";
import { toast } from "react-toastify";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const axios = require("axios");
function MobileNumber(props) {
  const [login, setLogin] = useState({});

  const onInputchange = (event) => {
    setLogin((prevState) => ({
      ...prevState, // keep all other key-value pairs
      [event.target.name]: event.target.value, // update the value of specific key
    }));
  };

  const loginUser = () => {
    if (!("phone" in login) || login.phone === "") {
      document.getElementById("phoneError").innerHTML =
        "Phone is Required Field!";
      return false;
    }

    // update profile
    document.getElementById("phoneError").innerHTML = "";
    submitLoginRequest();
  };

  const submitLoginRequest = () => {
    console.log("requestOTP", login);
    const loginUserReq = API.API_ENDPOINT + "/requestOTP";
    axios
      .post(
        loginUserReq,
        {
          phone: login.phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${API.TOKEN}`,
          },
        }
      )
      .then((response) => {
        console.log("response login", response.data);
        if (response.data.status) {
          toast.success("Otp Successfully send to registred mobile number!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          props.history.push({
            pathname: "/otp",
            state: { mobile: login.phone },
          });
        } else {
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(function (error) {
        console.log("error", error);
        toast.error("Something went wrong try again later!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="body">
      <Header action={"mobile-number"} />
      <Breadcrumbs subBreadcrumbs={"Login"} mainBreadcrumbs={"Home"} />
      <div className="content-shrink">
        <section className="login section-padding mobileNumber">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-12 col-xs-12">
                <div className="login-form login-area">
                  <h1>Expert Shaala</h1>
                  <div role="form" className="login-form">
                    <div className="form-group">
                      <p>Online Workshops For Young Minds by Celebrities & Experts Just pick your courses & attend live classes</p>
                      <div className="input-icon">
                        <i className="lni-user"></i>
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          placeholder="Mobile Registred Number"
                          defaultValue={login ? login.phone : ""}
                          onChange={(text) => onInputchange(text)}
                        />
                      </div>
                      <div
                        className="help-block with-errors"
                        id="phoneError"
                      ></div>
                    </div>
                    <div className="form-group mb-3">
                      {/* <a className="forgetpassword" href="/forgot-password">
                        Forgot Password?
                      </a> */}
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-common log-btn"
                        onClick={() => loginUser()}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default MobileNumber;

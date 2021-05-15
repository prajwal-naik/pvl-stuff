import React, { useState, useEffect } from "react";
import "./Otp.css";
import API from "../../config/env";
import { reactLocalStorage } from "reactjs-localstorage";
import { toast } from "react-toastify";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const axios = require("axios");
function Otp(props) {
  const [login, setLogin] = useState({});
  const [mobile, setMobile] = useState('');
  console.log("props",props);

  useEffect(() => {
    if (!props.location && props.location.state.mobile === null) {
      toast.error("User Not Found, Please enter correct mobile Number!!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      props.history.push("/mobile-number", null);
    } else {
      setMobile(props.location.state.mobile)
    }
  }, [props.location, props.history]);

  const onInputchange = (event) => {
    setLogin((prevState) => ({
      ...prevState, // keep all other key-value pairs
      [event.target.name]: event.target.value, // update the value of specific key
    }));
  };

  const loginUser = () => {
    if (!("otp" in login) || login.otp === "") {
      document.getElementById("otpError").innerHTML =
        "otp is Required Field!";
      return false;
    }

    // update profile
    document.getElementById("otpError").innerHTML = "";
    submitLoginRequest();
  };

  const submitLoginRequest = () => {
    console.log("validateOTP", login);
    console.log("validateMobile", mobile);
    const loginUserReq = API.API_ENDPOINT + "/validateOTP";
    axios
      .post(
        loginUserReq,
        {
          phone: mobile,
          otp: login.otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${API.TOKEN}`,
          },
        }
      )
      .then((response) => {
        console.log("response otp", response.data);
        if (response.data.status) {
          reactLocalStorage.setObject("user", response.data.result);
          toast.success("Login Successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          props.history.push("/", null);
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
      <Header action={"otp"} />
      <Breadcrumbs subBreadcrumbs={"Login"} mainBreadcrumbs={"Home"} />
      <div className="content-shrink">
        <section className="login section-padding Otp">
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
                          name="otp"
                          className="form-control"
                          placeholder="Enter Otp"
                          defaultValue={login ? login.otp : ""}
                          onChange={(text) => onInputchange(text)}
                        />
                      </div>
                      <div
                        className="help-block with-errors"
                        id="otpError"
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
                        Login
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

export default Otp;

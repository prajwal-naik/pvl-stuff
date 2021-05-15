import React, { useState } from "react";
import "./ForgotPassword.css";
import API from "../../config/env";
import { toast } from "react-toastify";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const axios = require("axios");
function ForgotPassword(props) {
  const [login, setLogin] = useState({});

  const onInputchange = (event) => {
    setLogin((prevState) => ({
      ...prevState, // keep all other key-value pairs
      [event.target.name]: event.target.value, // update the value of specific key
    }));
  };

  const passwordUser = () => {
    if (!('phone' in login) || login.phone === "") {
      document.getElementById("phoneError").innerHTML =
        "Phone is Required Field!";
      return false;
    }
    if (!('password' in login) || login.password === "") {
      document.getElementById("phoneError").innerHTML = "";
      document.getElementById("passwordError").innerHTML =
        "Password is Required Field!";
      return false;
    }

    // update profile
    document.getElementById("phoneError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    submitPasswordRequest();
  };

  const submitPasswordRequest = () => {
    console.log("webLogin",login)
    const passwordUserReq = API.API_ENDPOINT + "/forgotPassword";
    axios
      .post(
        passwordUserReq,
        {
          phone: login.phone,
          password: login.password
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${API.TOKEN}`,
          },
        }
      )
      .then((response) => {
        console.log("response forgot", response.data);
        if (response.data.status) {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          props.history.push("/signin", null);
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
      <Header action={"signin"} />
      <Breadcrumbs subBreadcrumbs={"Forgot Password"} mainBreadcrumbs={"Login"} />
      <div className="content-shrink">
        <section className="login section-padding signIn">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-12 col-xs-12">
                <div className="login-form login-area">
                  <h3>Forgot Password</h3>
                  <div role="form" className="login-form">
                    <div className="form-group">
                      <div className="input-icon">
                        <i className="lni-user"></i>
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          placeholder="Enter Registred Mobile Number"
                          defaultValue={login ? login.phone : ""}
                          onChange={(text) => onInputchange(text)}
                        />
                      </div>
                      <div
                        className="help-block with-errors"
                        id="phoneError"
                      ></div>
                    </div>
                    <div className="form-group">
                      <div className="input-icon">
                        <i className="lni-lock"></i>
                        <input
                          type="password"
                          name="password"
                          maxLength="12"
                          minLength="3"
                          className="form-control"
                          placeholder="Enter New Password"
                          defaultValue={login ? login.password : ""}
                          onChange={(text) => onInputchange(text)}
                        />
                      </div>
                      <div
                        className="help-block with-errors"
                        id="passwordError"
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
                      onClick={() => passwordUser()}
                      >Submit</button>
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

export default ForgotPassword;

import React, { useState } from "react";
import "./Signup.css";
import API from "../../config/env";
import { toast } from "react-toastify";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const axios = require("axios");
function Signup(props) {
  const [register, setRegister] = useState({});

  const onInputchange = (event) => {
    setRegister((prevState) => ({
      ...prevState, // keep all other key-value pairs
      [event.target.name]: event.target.value, // update the value of specific key
    }));
  };

  const registerUser = () => {
    if (!("username" in register) || register.username === "") {
      document.getElementById("usernameError").innerHTML =
        "Name is Required Field!";
      return false;
    }
    if (!("email" in register) || register.email === "") {
      document.getElementById("usernameError").innerHTML = "";
      document.getElementById("emailError").innerHTML =
        "Email is Required Field!";
      return false;
    }
    if (!("phone" in register) || register.phone === "") {
      document.getElementById("usernameError").innerHTML = "";
      document.getElementById("phoneError").innerHTML = "";
      document.getElementById("phoneError").innerHTML =
        "Phone is Required Field!";
      return false;
    }
    if (!("password" in register) || register.password === "") {
      document.getElementById("usernameError").innerHTML = "";
      document.getElementById("phoneError").innerHTML = "";
      document.getElementById("emailError").innerHTML = "";
      document.getElementById("passwordError").innerHTML =
        "Password is Required Field!";
      return false;
    }

    // update profile
    document.getElementById("usernameError").innerHTML = "";
    document.getElementById("phoneError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    submitRegisterRequest();
  };

  const submitRegisterRequest = () => {
    const registerUser = API.API_ENDPOINT + "/webRegister";
    axios
      .post(
        registerUser,
        {
          name: register.username,
          email: register.email,
          phone: register.phone,
          password: register.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${API.TOKEN}`,
          },
        }
      )
      .then((response) => {
        console.log("response regsiter", response.data);
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
      <Header action={"signup"} />
      <Breadcrumbs subBreadcrumbs={"SignUp"} mainBreadcrumbs={"Home"} />
      <div className="content-shrink">
        <section className="register section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-12 col-xs-12">
                <div className="register-form login-area">
                  <h3>Register</h3>
                  <div className="login-form">
                    <div className="form-group">
                      <div className="input-icon">
                        <i className="lni-user"></i>
                        <input
                          type="text"
                          id="Name"
                          name="username"
                          className="form-control"
                          placeholder="Username"
                          defaultValue={register ? register.username : ""}
                          onChange={(text) => onInputchange(text)}
                        />
                      </div>
                      <div
                        className="help-block with-errors"
                        id="usernameError"
                      ></div>
                    </div>
                    <div className="form-group">
                      <div className="input-icon">
                        <i className="lni-envelope"></i>
                        <input
                          type="email"
                          id="sender-email"
                          name="email"
                          className="form-control"
                          placeholder="Email Address"
                          defaultValue={register ? register.email : ""}
                          onChange={(text) => onInputchange(text)}
                        />
                      </div>
                      <div
                        className="help-block with-errors"
                        id="emailError"
                      ></div>
                    </div>
                    <div className="form-group">
                      <div className="input-icon">
                        <i className="lni-phone"></i>
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          placeholder="Mobile Number"
                          defaultValue={register ? register.phone : ""}
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
                          placeholder="Password"
                          defaultValue={register ? register.password : ""}
                          onChange={(text) => onInputchange(text)}
                        />
                      </div>
                      <div
                        className="help-block with-errors"
                        id="passwordError"
                      ></div>
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-common log-btn"
                        onClick={() => registerUser()}
                      >
                        Register
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

export default Signup;

import React, { useState, useEffect } from "react";
import "./TrainerDetails.css";

import API from "../../config/env";
import { reactLocalStorage } from "reactjs-localstorage";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

import Header from "../../components/Header/Header";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Footer from "../../components/Footer/Footer";


const axios = require("axios");
function WatchModal(props) {
  const [login, setLogin] = useState({});

  const onInputchange = (event) => {
    setLogin((prevState) => ({
      ...prevState, // keep all other key-value pairs
      [event.target.name]: event.target.value, // update the value of specific key
    }));
  };

  const loginUser = () => {
    if (!("phone" in login) || login.phone === "") {
      toast.error("Phone is Required Field!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
    if (!("password" in login) || login.password === "") {
      toast.error("Password is Required Field!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    // Sign In
    submitLoginRequest();
  };

  const submitLoginRequest = () => {
    console.log("webLogin", login);
    const loginUserReq = API.API_ENDPOINT + "/webLogin";
    axios
      .post(
        loginUserReq,
        {
          phone: login.phone,
          password: login.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${API.TOKEN}`,
          },
        }
      )
      .then((response) => {
        console.log("response login", props);
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
          props.onHide();
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
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h6>Login With ExpertShala</h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="login-form login-area trainer-login-area">
          <h3>Login Now</h3>
          <div role="form" className="login-form">
            <div className="form-group">
              <div className="input-icon">
                <i className="lni-user"></i>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Mobile Number"
                  defaultValue={login ? login.phone : ""}
                  onChange={(text) => onInputchange(text)}
                />
              </div>
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
                  defaultValue={login ? login.password : ""}
                  onChange={(text) => onInputchange(text)}
                />
              </div>
            </div>
            {/* <div className="form-group mb-3">
              <a className="forgetpassword" href="/forgot-password">
                Forgot Password?
              </a>
            </div> */}
            <div className="text-center">
              <button
                className="btn btn-common log-btn"
                onClick={() => loginUser()}
              >
                Submit
              </button>
            </div>
            {/* <div className="text-center signup_row">
              <a className="signup" href="/signup">
                New User? Signup
              </a>
            </div> */}
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}


function TrainerDetails(props) {
  const [watch, setWatch] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  let localData = reactLocalStorage.getObject("user");

  useEffect(() => {
    if (
      Object.keys(localData).length === 0 &&
      localData.constructor === Object
    ) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [localData]);

  const handleShow = () => {
    console.log("Know More");
    setWatch(true);
  };

  const watchExppertShow = () => {
    console.log("watch Video Now");
    toast.info("Welcome to ExpertShaala, Now you have access to watch video!!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div className="body">
      <Header action={"trainer"} />
      <Breadcrumbs
        subBreadcrumbs={"Know about Experts"}
        mainBreadcrumbs={"Trainer"}
      />
      <WatchModal show={watch} onHide={() => setWatch(false)} props={props} />
      <section className="row trainer-details">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="section section--blue hero text-center">
            <div className="container">
              <div className="row row--narrow-80">
                <div className="col">
                  <h5 className="logo logo--hero">ExpertShaala</h5>
                  <div className="timer"></div>
                  <h2 className="hero__lead">
                    LEARN HOW YOU CAN START A PROFITABLE ONLINE STORE (IN
                    12 WEEKS OR LESS)...
                  </h2>
                  <h3 className="hero__sublead">
                    (THESE 5 STEPS PROVE ANYONE CAN DO THIS)
                  </h3>
                  <div className="widget_wrapper_btn">
                    {" "}
                    <button
                      className="ew-md-trigger ewp_widget_btnid btn--default btn--hero trainer-details-btn"
                      btn_id="0"
                      onClick={() => (!isLogin ? handleShow() : watchExppertShow())}
                    >
                      YES, SHOW ME HOW!
                    </button>{" "}
                    <script
                      type="text/javascript"
                      src="https://ewpcdn.easywebinar.com/widget/js/ewp_widget.js?v=1.23.27"
                    ></script>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
      </section>

      <section className="section section--light discover trainer-details">
        <div className="container">
          <div className="row">
            <div className="col">
              {/* <h2 className="section-title">
                DISCOVER EXACTLY HOW EVERYONE ELSE IS DOING IT!{" "}
                <span>REGISTER NOW TO LEARN:</span>
              </h2> */}
            </div>
          </div>
          <div className="row row--narrow-90">
            <div className="col-md-5">
              <img
                src="https://foundr.com/ecommerce-masterclass-src/images/Gretta_Cover.jpg"
                width="300"
                height="400"
                className="details-image"
                alt="Your Instructor: Gretta Van Riel"
              />
            </div>
            <div className="col-md-7">
              <ul className="list list--icon">
                <li className="list__item">
                  <strong>Fact/Fiction?</strong> 
                  Find out how other people are
                  starting highly profitable online stores (and what product
                  ideas work the best).
                </li>
                <li className="list__item">
                  <strong>How to know if your idea will work</strong> without
                  months of wasted time, money, or procrastination.
                </li>
                <li className="list__item">
                  <strong>Gretta’s “Golden Trifecta”</strong> and why if you
                  don’t use it you will fail with your e-commerce store
                </li>
                <li className="list__item">
                  <strong>How you can get sales immediately.</strong> Discover
                  the formula that Gretta used to launch one of her new brands
                  to one million dollars in sales on day one.
                </li>
                <li className="list__item"> And Much More!</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--light content trainer-details">
        <div className="container">
          <div className="row row--narrow-80">
            <div className="col">
              <h2 className="section-title">
                TAUGHT BY ECOMMERCE EXPERT, <span>GRETTA ROSE VAN RIEL</span>
              </h2>
              <p>
                Within just 6 months of starting her first online store, Gretta
                was making $600,000 USD per month in sales (without funding or
                investment). She then cofounded another online store that
                generated $100,000 USD on it's the first day!
              
                So far Gretta had been responsible for two multimillion dollar
                ecommerce brands... she had been wildly successful twice, but
                could she do it again?
              
                She simplified her approach into a framework that she followed
                two more times. Turning each new ecommerce business into a
                multimillion dollar success story. Gretta now had a proven
                method for starting (and scaling) online stores in any niche.
             
                She has seen million dollar sales days for her online stores and
                just celebrated 5 years since she started her first successful
                ecommerce store from her kitchen (and yes, it's still going
                strong!).
              </p>
            </div>
          </div>
          <div className="row row--narrow-80">
            <div className="col">
              <h2 className="section-title">
                AT JUST 22 YEARS OLD...GRETTA SCALED HER VERY FIRST STORE TO
                $600,000 P/MONTH
              </h2>
              <figure>
                <img
                  className="shadow"
                  src="https://foundr.com/ecommerce-masterclass-src/images/Rzoom_SAS_Dec_Launch_Email_Sequence.jpg"
                  width="854"
                  height="409"
                  alt="GRETTA SCALED HER FIRST STORE TO $600,000 P/MONTH"
                />
                <figcaption>
                  (SCREENSHOT: Gretta was making $600,000 per month, after just
                  6 months in business)
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <h2 className="section-title">
                AND WAS RECOGNISED IN FORBES FOR ECOMMERCE...
              </h2>
              <figure>
                <img
                  className="shadow shadow--down"
                  src="https://foundr.com/ecommerce-masterclass-src/images/Gretta_Forbes.jpg"
                  width="400"
                  height="393"
                  alt="GRETTA RECOGNISED IN FORBES FOR ECOMMERCE"
                />
                <figcaption>
                  (Gretta was also featured as a Forbes 30 under 30 winner as a
                  successful entrepreneur)
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="row row--narrow-80 mt-3">
            <div className="col">
              <h2 className="section-title">
                JOIN THE MASTERCLASS TODAY AND LEARN THE EXACT SYSTEM
                THAT SHE USES AND TEACHES HER STUDENTS
              </h2>
              <p>
                Join the masterclass <strong>today</strong> to learn her system
                for quickly testing ideas and starting profitable online stores
                so that you can finally get started on your very own.
              
                Host and CEO of Foundr, Nathan Chan asks her all of the details
                of her business in this in-depth training.
              </p>
            </div>
          </div>
          <div className="row center-cols">
            <div className="col col--6">
              <div className="embedded-joinwebinar-button">
                <div className="widget_wrapper_btn text-center">
                  {" "}
                  <button
                    className="ew-md-trigger ewp_widget_btnid btn--default btn--hero trainer-details-btn"
                    btn_id="1"
                    onClick={() => (!isLogin ? handleShow() : watchExppertShow())}
                  >
                    YES, SHOW ME HOW!
                  </button>{" "}
                  <script
                    type="text/javascript"
                    src="https://ewpcdn.easywebinar.com/widget/js/ewp_widget.js?v=1.23.27"
                  ></script>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default TrainerDetails;

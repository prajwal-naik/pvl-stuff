import React, { useState, useEffect } from "react";
import "./Account.css";
import API from "../../config/env";
import { reactLocalStorage } from "reactjs-localstorage";
import { toast } from "react-toastify";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import {
  PaymentBody,
  PaymentHeader,
} from "../../components/PaymentCard/PaymentCard";
import CustomAlert from "../../components/CustomAlert/CustomAlert";

import { paymentList, paymentField } from "../../config/payment";

import {
  WishlistBody,
  WishlistHeader,
} from "../../components/WishlistCard/WishlistCard";

import { wishlistList, wishlistField } from "../../config/wishlist";

const axios = require("axios");
const tabs = [
  // { id: 0, key: "dashboard", icon: "lni-dashboard", title: "Dashboard" },
  { id: 1, key: "settings", icon: "lni-cog", title: "Profile Settings" },
  // { id: 2, key: "payments", icon: "lni-wallet", title: "Payments" },
  // { id: 3, key: "wishlist", icon: "lni-heart", title: "My Wishlist" },
  { id: 4, key: "logout", icon: "lni-enter", title: "Logout" },
];
function Account(props) {
  const [profile, setProfile] = useState({});
  const [settings, setSettings] = useState(true);
  const [payments, setPayments] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [alert, setAlert] = useState(null);
  const [wishlistId, setWishlistId] = useState("");
  let localData = reactLocalStorage.getObject("user");

  useEffect(() => {
    console.log("localData", localData);
    if (
      Object.keys(localData).length === 0 &&
      localData.constructor === Object
    ) {
      props.history.push("/", null);
    } else {
      axios
        .get(`${API.API_ENDPOINT}/profile/${localData.id}`, {
          crossDomain: true,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${API.TOKEN}`,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then(function (response) {
          console.log("cat", response);
          if (response.data && response.data.status) {
            let profileResult = response.data.result;
            setProfile(profileResult);
          } else {
            console.log("No Profile data found", response.data.message);
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    }
  }, [props.history]);

  const onInputchange = (event) => {
    console.log("event", event);
    setProfile((prevState) => ({
      ...prevState, // keep all other key-value pairs
      [event.target.name]: event.target.value, // update the value of specific key
    }));
  };

  const updateProfile = () => {
    if (profile.name === "" || profile.name === null) {
      document.getElementById("nameError").innerHTML =
        "Name is Required Field!";
      return false;
    }
    if (profile.phone === "" || profile.phone === null) {
      document.getElementById("nameError").innerHTML = "";
      document.getElementById("phoneError").innerHTML =
        "Phone is Required Field!";
      return false;
    }
    if (profile.email === "" || profile.email === null) {
      document.getElementById("nameError").innerHTML = "";
      document.getElementById("phoneError").innerHTML = "";
      document.getElementById("emailError").innerHTML =
        "Email is Required Field!";
      return false;
    }
    if (profile.address === "" || profile.address === null) {
      document.getElementById("nameError").innerHTML = "";
      document.getElementById("phoneError").innerHTML = "";
      document.getElementById("emailError").innerHTML = "";
      document.getElementById("addressError").innerHTML =
        "Address is Required Field!";
      return false;
    }
    if (profile.city === "" || profile.city === null) {
      document.getElementById("nameError").innerHTML = "";
      document.getElementById("phoneError").innerHTML = "";
      document.getElementById("emailError").innerHTML = "";
      document.getElementById("addressError").innerHTML = "";
      document.getElementById("cityError").innerHTML =
        "City is Required Field!";
      return false;
    }
    if (profile.pincode === "" || profile.pincode === null) {
      document.getElementById("nameError").innerHTML = "";
      document.getElementById("phoneError").innerHTML = "";
      document.getElementById("emailError").innerHTML = "";
      document.getElementById("addressError").innerHTML = "";
      document.getElementById("cityError").innerHTML = "";
      document.getElementById("pincodeError").innerHTML =
        "Pincode is Required Field!";
      return false;
    }

    // update profile
    document.getElementById("nameError").innerHTML = "";
    document.getElementById("phoneError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("addressError").innerHTML = "";
    document.getElementById("cityError").innerHTML = "";
    document.getElementById("pincodeError").innerHTML = "";
    submitProfileRequest(profile.id);
  };

  const submitProfileRequest = (user_id) => {
    const updateProfile = API.API_ENDPOINT + "/updateProfile/" + user_id;
    axios
      .put(
        updateProfile,
        {
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          pincode: profile.pincode,
          address: profile.address,
          city: profile.city,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${API.TOKEN}`,
          },
        }
      )
      .then((response) => {
        console.log("response update profile", response.data);
        if (response.data.status) {
          toast.success("Profile Succefully Updated!", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(
            "Profile not updated Successfully! Please try again later!",
            {
              position: "top-right",
              autoClose: 2500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
      })
      .catch(function (error) {
        console.log("error", error);
        toast.error("Something went wrong try again later!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const profileAction = (action) => {
    console.log("action", action);
    switch (action) {
      case "settings":
        setSettings(true);
        setPayments(false);
        setWishlist(false);
        break;
      case "payments":
        setSettings(false);
        setPayments(true);
        setWishlist(false);
        break;
      case "wishlist":
        setSettings(false);
        setPayments(false);
        setWishlist(true);
        break;
      case "logout":
        alertPerform("logout");
        break;

      default:
        setSettings(true);
        setPayments(false);
        setWishlist(false);
        break;
    }
  };

  const alertPerform = (action) => {
    const getlogoutAlert = () => (
      <CustomAlert
        confirmBtnText={"Yeah, Logout"}
        cancelBtnText={"No, Cancel it"}
        confirmBtnBsStyle={"danger"}
        cancelBtnBsStyle={"light"}
        customIcon={
          "https://www.kindpng.com/picc/m/312-3120781_logout-icon-png-transparent-png.png"
        }
        title={"Hold On,"}
        description={"Do You Want to Logout?"}
        onConfirm={() => onConfirm(action)}
        onCancel={() => onCancel()}
      />
    );
    const deleteWishlistAlert = () => (
      <CustomAlert
        confirmBtnText={"Yeah, Delete it"}
        cancelBtnText={"No, Cancel it"}
        confirmBtnBsStyle={"danger"}
        cancelBtnBsStyle={"light"}
        customIcon={
          "https://freepngimg.com/thumb/delete_button/25588-7-delete-button-picture.png"
        }
        title={"Hold On,"}
        description={"Do You Want to Delete course from wishlist?"}
        onConfirm={() => onConfirm(action)}
        onCancel={() => onCancel()}
      />
    );
    setAlert(action === "logout" ? getlogoutAlert : deleteWishlistAlert);
  };

  const onCancel = () => {
    console.log("Hiding alert...");
    setAlert(null);
  };

  const onConfirm = (action) => {
    console.log("on confirm...");
    if (action === "logout") {
      reactLocalStorage.clear();
      setAlert(null);
      toast.success("Succefully Logout!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      props.history.push("/", null);
    } else if (action === "wishlist-delete") {
      deleteWishlistAPI();
    } else {
      setAlert(null);
    }
  };

  const removeWishlist = (id) => {
    setWishlistId(id);
    console.log("wishlist", wishlistId);
    alertPerform("wishlist-delete");
  };

  const deleteWishlistAPI = () => {
    const deleteWishlist = API.API_ENDPOINT + "/removeWishlist";
    axios
      .post(
        deleteWishlist,
        {
          user_id: localData.id,
          wishlist_id: wishlistId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${API.TOKEN}`,
          },
        }
      )
      .then((response) => {
        console.log("delete WIshlist", response.data);
        if (response.data.status) {
          setAlert(null);
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload(false);
          }, 2000);
        } else {
          setAlert(null);
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
      <Header action={"account-profile-setting"} />
      <Breadcrumbs
        subBreadcrumbs={"Profile Settings"}
        mainBreadcrumbs={"Home"}
      />
      <div className="account-sec">
        <div id="content" className="section-padding">
          <div className="container">
            <div className="row">
              {alert}
              <div className="col-sm-12 col-md-4 col-lg-3 page-sidebar">
                <aside>
                  <div className="sidebar-box">
                    <div className="user">
                      <figure>
                        <a href="/account-profile-setting">
                          <img src="assets/img/author/img1.jpg" alt="" />
                        </a>
                      </figure>
                      <div className="usercontent">
                        <h3>{profile ? profile.name : ""}</h3>
                        <h4>{profile ? profile.phone : ""}</h4>
                      </div>
                    </div>
                    <nav className="navdashboard">
                      <ul>
                        {tabs.map((item) => {
                          return (
                            <li key={item.id} className={"activeClass"}>
                              <a
                                href={"#" + item.key}
                                onClick={() => profileAction(item.key)}
                              >
                                <i className={item.icon}></i>
                                <span>{item.title}</span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  </div>
                </aside>
              </div>
              {/* Settings */}
              {settings && (
                <div className="col-sm-12 col-md-8 col-lg-9 profile-section">
                  <div className="row page-content">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10">
                      <div className="inner-box">
                        <div className="tg-contactdetail">
                          <div className="dashboard-box">
                            <h2 className="dashbord-title">Profile Details</h2>
                          </div>
                          <div className="dashboard-wrapper">
                            <div className="row">
                              <div className="form-group mb-3 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <label className="control-label">
                                  First Name*
                                </label>
                                <input
                                  className="form-control input-md"
                                  name="name"
                                  type="text"
                                  required=""
                                  defaultValue={profile ? profile.name : ""}
                                  onChange={(text) => onInputchange(text)}
                                />
                                <div
                                  className="help-block with-errors"
                                  id="nameError"
                                ></div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group mb-3 col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                <label className="control-label">Phone*</label>
                                <input
                                  className="form-control input-md"
                                  name="phone"
                                  type="text"
                                  required=""
                                  defaultValue={profile ? profile.phone : ""}
                                  onChange={(text) => onInputchange(text)}
                                />
                                <div
                                  className="help-block with-errors"
                                  id="phoneError"
                                ></div>
                              </div>
                              <div className="form-group mb-3 col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                <label className="control-label">
                                  Email Address
                                </label>
                                <input
                                  className="form-control input-md"
                                  name="email"
                                  type="email"
                                  required=""
                                  defaultValue={profile ? profile.email : ""}
                                  onChange={(text) => onInputchange(text)}
                                />
                                <div
                                  className="help-block with-errors"
                                  id="emailError"
                                ></div>
                              </div>
                            </div>
                            <div className="form-group mb-3">
                              <label className="control-label">
                                Enter Address
                              </label>
                              <textarea
                                className="form-control input-md"
                                name="address"
                                type="text"
                                required=""
                                defaultValue={profile ? profile.address : ""}
                                onChange={(text) => onInputchange(text)}
                              ></textarea>
                              <div
                                className="help-block with-errors"
                                id="addressError"
                              ></div>
                            </div>

                            <div className="row">
                              <div className="form-group mb-3 col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                <label className="control-label">City</label>
                                <input
                                  className="form-control input-md"
                                  name="city"
                                  type="text"
                                  required=""
                                  defaultValue={profile ? profile.city : ""}
                                  onChange={(text) => onInputchange(text)}
                                />
                                <div
                                  className="help-block with-errors"
                                  id="cityError"
                                ></div>
                              </div>
                              <div className="form-group mb-3 col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                <label className="control-label">Pincode</label>
                                <input
                                  className="form-control input-md"
                                  name="pincode"
                                  type="text"
                                  required=""
                                  defaultValue={profile ? profile.pincode : ""}
                                  onChange={(text) => onInputchange(text)}
                                />
                                <div
                                  className="help-block with-errors"
                                  id="pincodeError"
                                ></div>
                              </div>
                            </div>
                            <button
                              className="btn btn-common"
                              type="button"
                              onClick={() => updateProfile()}
                            >
                              Update Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payments */}
              {payments && (
                <div className="col-sm-12 col-md-8 col-lg-9 payments-section">
                  <div className="page-content">
                    <div className="inner-box">
                      <div className="dashboard-box">
                        <h2 className="dashbord-title">My Payments</h2>
                      </div>
                      <div className="dashboard-wrapper">
                        {paymentList.length > 0 ? (
                          <table className="table table-responsive dashboardtable tablemyads scroll">
                            <thead>
                              <tr>
                                {paymentField.map((field) => {
                                  return (
                                    <PaymentHeader
                                      key={field.id}
                                      title={field.title}
                                    />
                                  );
                                })}
                              </tr>
                            </thead>
                            <tbody>
                              {paymentList.map((payment) => {
                                return (
                                  <PaymentBody
                                    key={payment.id}
                                    payment_id={payment.id}
                                    course_id={payment.course_id}
                                    img={
                                      API.API_IMAGE_WITH_HTTPS +
                                      "" +
                                      payment.details_img
                                    }
                                    title={payment.course_name}
                                    slug={payment.course_slug}
                                    description={payment.description}
                                    tranasctionId={payment.reference_number}
                                    category={payment.category}
                                    categoryAction={payment.status}
                                    price={payment.amount_collected}
                                    email={payment.email}
                                    phone={payment.phone}
                                  />
                                );
                              })}
                            </tbody>
                          </table>
                        ) : (
                          <div className="dashboard-box-updated">
                            <img
                              src="https://image.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg"
                              alt="No Record "
                              className="noRecord"
                            />
                            <h2 className="dashbord-title">
                              No Payment Record Found!
                            </h2>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Wishlist */}
              {wishlist && (
                <div className="col-sm-12 col-md-8 col-lg-9 wishlist-section">
                  <div className="page-content">
                    <div className="inner-box">
                      <div className="dashboard-box">
                        <h2 className="dashbord-title">My Wishlist Courses</h2>
                      </div>
                      <div className="dashboard-wrapper">
                        {wishlistList.length > 0 ? (
                          <table className="table table-responsive dashboardtable tablemyads">
                            <thead>
                              <tr>
                                {wishlistField.map((field) => {
                                  return (
                                    <WishlistHeader
                                      key={field.id}
                                      title={field.title}
                                    />
                                  );
                                })}
                              </tr>
                            </thead>
                            <tbody>
                              {wishlistList.map((wishlist) => {
                                return (
                                  <WishlistBody
                                    key={wishlist.wishlist_id}
                                    wishlist_id={wishlist.wishlist_id}
                                    course_id={wishlist.course_id}
                                    img={
                                      API.API_IMAGE_WITH_HTTPS +
                                      "" +
                                      wishlist.details_img
                                    }
                                    title={wishlist.course_name}
                                    slug={wishlist.course_slug}
                                    description={wishlist.description}
                                    duration={wishlist.duration}
                                    highlight_2={wishlist.highlight_2}
                                    category={wishlist.category}
                                    status={"active"}
                                    removeWishlist={() =>
                                      removeWishlist(wishlist.wishlist_id)
                                    }
                                  />
                                );
                              })}
                            </tbody>
                          </table>
                        ) : (
                          <div className="dashboard-box-updated">
                            <img
                              src="https://image.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg"
                              alt="No Record "
                              className="noRecord"
                            />
                            <h2 className="dashbord-title">
                              No Wishlist Found!
                            </h2>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Account;

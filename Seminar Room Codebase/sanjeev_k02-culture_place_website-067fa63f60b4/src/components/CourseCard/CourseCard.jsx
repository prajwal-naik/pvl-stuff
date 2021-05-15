import React, { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import "./CourseCard.css";
import API from "../../config/env";
import { toast } from "react-toastify";
const axios = require("axios");

function CourseCard(props) {
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

  const addWishlistAPI = () => {
    if (isLogin) {
      const addWishlist = API.API_ENDPOINT + "/addWishlist";
      axios
        .post(
          addWishlist,
          {
            user_id: localData.id,
            course_id: props.id,
            user_mobile: 7004798516,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${API.TOKEN}`,
            },
          }
        )
        .then((response) => {
          console.log("add WIshlist", response.data);
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
    } else {
      toast.error("Please Login to Perform Wishlist!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (props.view === "franchise-grid") {
    return (
      <React.Fragment>
        <div
          className={
            "col-xs-12 col-sm-12 " +
            (props.view === "franchise-grid"
              ? "col-md-4 col-lg-4"
              : "col-md-12 col-lg-12")
          }
        >
          <div className="featured-box featured-box-updated">
            <figure>
              <div
                className="icon wishlistIcon"
                onClick={() => addWishlistAPI()}
              >
                <i className="lni-heart"></i>
              </div>
              <a href={"/details/" + props.slug}>
                <img className="img-fluid" src={props.img} alt="" />
              </a>
            </figure>
            <div className="feature-content feature-content-updated">
              <div className="product">
                {/* <a
                    href={
                      "/details/" + props.slug
                    }
                  >
                    <i className="lni-folder"></i> {props.category}
                  </a> */}
              </div>
              <h4>
                <a href={"/details/" + props.slug}>{props.title}</a>
              </h4>
              {/* <span>Last Updated: 3 hours ago</span> */}
              <ul className="address">
                {props.ageGroup && (
                  <li>
                    <a href={"/details/" + props.slug}>{props.ageGroup}</a>
                  </li>
                )}
                {props.duration && (
                  <li>
                    <a href={"/details/" + props.slug}>{props.duration}</a>
                  </li>
                )}
                {props.schedule && (
                  <li>
                    <a href={"/details/" + props.slug}>{props.schedule}</a>
                  </li>
                )}
              </ul>
              <div className="listing-bottom">
                <h3 className="price float-left">Rs. {props.price}</h3>
                <a
                  href={"/details/" + props.slug}
                  className="btn-verified float-right price-link"
                >
                  <h6 className="price-model">
                    <i className="lni-check-box"></i> Register Now
                  </h6>
                </a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  if (props.view === "franchise-list") {
    return (
      <React.Fragment>
        <div className={"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
          <div className="featured-box  featured-box-list featured-box-updated">
            <figure>
              <div
                className="icon wishlistIcon"
                onClick={() => addWishlistAPI()}
              >
                <i className="lni-heart"></i>
              </div>
              <a href={"/details/" + props.slug}>
                <img className="img-fluid" src={props.img} alt="" />
              </a>
            </figure>
            <div className="feature-content feature-content-updated">
              <div className="product">
                {/* <a href={"/details/"+props.slug}>
                  <i className="lni-folder"></i> {props.category}
                </a> */}
              </div>
              <h4>
                <a href={"/details/" + props.slug}>{props.title}</a>
              </h4>
              {/* <span>Last Updated: 3 hours ago</span> */}
              <ul className="address">
                {props.ageGroup && (
                  <li>
                    <a href={"/details/" + props.slug}>{props.ageGroup}</a>
                  </li>
                )}
                {props.duration && (
                  <li>
                    <a href={"/details/" + props.slug}>{props.duration}</a>
                  </li>
                )}
                {props.schedule && (
                  <li>
                    <a href={"/details/" + props.slug}>{props.schedule}</a>
                  </li>
                )}
              </ul>
              <div className="listing-bottom">
                <h3 className="price float-left">Rs. {props.price}</h3>
                <a
                  href={"/details/" + props.slug}
                  className="btn-verified float-right price-link"
                >
                  <h6 className="price-model">
                    <i className="lni-check-box"></i> Register Now
                  </h6>
                </a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }


  return (
    <React.Fragment>
      {props.view === "home" ? (
        <div className={"col-xs-12 col-sm-12 col-md-6 col-lg-4"}>
          <div className="featured-box featured-box-updated">
            <figure>
              <div
                className="icon wishlistIcon"
                onClick={() => addWishlistAPI()}
              >
                <i className="lni-heart"></i>
              </div>
              <a href={"/details/" + props.slug}>
                <img className="img-fluid" src={props.img} alt="" />
              </a>
            </figure>
            <div className="feature-content feature-content-updated">
              <div className="product">
                {/* <a href={"/details/"+props.slug}>
                    <i className="lni-folder"></i> {props.category}
                  </a> */}
              </div>
              <h4>
                <a href={"/details/" + props.slug}>{props.title}</a>
              </h4>
              {/* <span>Last Updated: 3 hours ago</span> */}
              <ul className="address">
                {props.ageGroup && (
                  <li>
                    <a href={"/details/" + props.slug}>{props.ageGroup}</a>
                  </li>
                )}
                {props.duration && (
                  <li>
                    <a href={"/details/" + props.slug}>{props.duration}</a>
                  </li>
                )}
                {props.schedule && (
                  <li>
                    <a href={"/details/" + props.slug}>{props.schedule}</a>
                  </li>
                )}
              </ul>
              <div className="listing-bottom">
                <h3 className="price float-left">Rs. {props.price}</h3>
                <a
                  href={"/details/" + props.slug}
                  className="btn-verified float-right price-link"
                >
                  <h6 className="price-model">
                    <i className="lni-check-box"></i> Register Now
                  </h6>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={
            "col-xs-12 col-sm-12 " +
            (props.view === "grid"
              ? "col-md-6 col-lg-6"
              : "col-md-12 col-lg-12")
          }
        >
          <div className="featured-box featured-box-updated">
            <figure>
              <div
                className="icon wishlistIcon"
                onClick={() => addWishlistAPI()}
              >
                <i className="lni-heart"></i>
              </div>
              <a href={"/details/" + props.slug}>
                <img className="img-fluid" src={props.img} alt="" />
              </a>
            </figure>
            <div className="feature-content feature-content-updated">
              <div className="product">
                {/* <a
                    href={
                      "/details/" + props.slug
                    }
                  >
                    <i className="lni-folder"></i> {props.category}
                  </a> */}
              </div>
              <h4>
                <a href={"/details/" + props.slug}>{props.title}</a>
              </h4>
              {/* <span>Last Updated: 3 hours ago</span> */}
              <ul className="address">
                {props.ageGroup && (
                  <li>
                    <a href={"/details/" + props.slug}>{props.ageGroup}</a>
                  </li>
                )}
                {props.duration && (
                  <li>
                    <a href={"/details/" + props.slug}>{props.duration}</a>
                  </li>
                )}
                {props.schedule && (
                  <li>
                    <a href={"/details/" + props.slug}>{props.schedule}</a>
                  </li>
                )}
              </ul>
              <div className="listing-bottom">
                <h3 className="price float-left">Rs. {props.price}</h3>
                <a
                  href={"/details/" + props.slug}
                  className="btn-verified float-right price-link"
                >
                  <h6 className="price-model">
                    <i className="lni-check-box"></i> Register Now
                  </h6>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default CourseCard;

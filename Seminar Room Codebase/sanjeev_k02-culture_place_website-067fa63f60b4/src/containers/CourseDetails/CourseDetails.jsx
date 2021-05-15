import React, { useState, useEffect } from "react";
import "./CourseDetails.css";
import { reactLocalStorage } from "reactjs-localstorage";
import { toast } from "react-toastify";
import Header from "../../components/Header/Header";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Footer from "../../components/Footer/Footer";
import RelatedCourseCard from "../../components/RelatedCourseCard/RelatedCourseCard";

// import relatedCoursesList from "../../config/relatedCourses";
// import coursesList from "../../config/courses";
import API from "../../config/env";
const axios = require("axios");

function CourseDetails(props) {
  const [course, setCourse] = useState(null);
  const [relatedCourse, setRelatedCourse] = useState([]);
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

  const registerCourse = () => {
    if (isLogin) {
      props.history.push(
        "/register/" + course[0].course_name.replace(/\s/g, "-").toLowerCase(),
        null
      );
    } else {
      toast.error("Please Login to Register with Course!", {
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

  useEffect(() => {
    if (!props.match.params && props.match.params.slug === null) {
      toast.error("Course Not Found", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      props.history.push("/", null);
    } else {
      axios
        .get(
          `${API.API_ENDPOINT}/courseDetailsWithTitle/${props.match.params.slug}`,
          {
            crossDomain: true,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${API.TOKEN}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then(function (response) {
          console.log("Course Details", response);
          if (response.data && response.data.status) {
            let courseDetailsResult = response.data.result;
            setCourse(courseDetailsResult);
          } else {
            console.log("No Course data found", response.data.message);
            toast.error("Something went wrong try again later!", {
              position: "top-right",
              autoClose: 2500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            props.history.push("/", null);
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
          props.history.push("/", null);
        });
    }
  }, [props.match.params, props.history]);

  useEffect(() => {
    if (!props.match.params && props.match.params.slug === null) {
      toast.error("Course Not Found", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      props.history.push("/", null);
    } else {
      axios
        .get(
          `${API.API_ENDPOINT}/releatedCoursesWithTitle/${props.match.params.slug}`,
          {
            crossDomain: true,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${API.TOKEN}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then(function (response) {
          console.log("Related Course Details", response);
          if (response.data && response.data.status) {
            let relatedCourseDetailsResult = response.data.result;
            setRelatedCourse(relatedCourseDetailsResult);
          } else {
            console.log("No Course data found", response.data.message);
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    }
  }, [props.match.params, props.history]);

  return (
    <div className="body">
      <Header action={"home"} />
      <Breadcrumbs subBreadcrumbs={"Course Details"} mainBreadcrumbs={"Home"} />
      {course !== null ? (
        <div className="details-sec">
          {/* Details section */}
          <div className="section-padding">
            <div className="container">
              <div className="product-info row">
                <div className="col-lg-7 col-md-12 col-xs-12">
                  <div className="details-box ads-details-wrapper">
                    <div id="owl-demo" className="owl-carousel owl-theme">
                      <div className="item">
                        <div className="product-img">
                          <img
                            className="img-fluid"
                            src={
                              API.API_IMAGE_WITH_HTTPS +
                              "" +
                              course[0].details_img
                            }
                            alt=""
                          />
                        </div>
                        <span className="price">Rs. {course[0].Fee}</span>
                      </div>
                      {/* <div className="item">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="/assets/img/productinfo/img2.jpg"
                          alt=""
                        />
                      </div>
                      <span className="price">$1,550</span>
                    </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12 col-xs-12">
                  <div className="details-box">
                    <div className="ads-details-info">
                      <h2>{course[0].course_name}</h2>
                      <p className="mb-2">{window.HTMLReactParser(course[0].course_description)}</p>
                      <div className="details-meta">
                        <span>
                          <b>Fees:</b> Rs. {course[0].Fee}
                        </span>
                        <br />
                        {course[0].Schedule && (
                          <span>
                            <b>Schedule:</b> {course[0].Schedule}
                          </span>
                        )}
                        <br />
                        {course[0].age_group && (
                          <span>
                            <b>Age Group:</b> {course[0].age_group}
                          </span>
                        )}
                        <br />
                        {course[0].duration && (
                          <span>
                            <b>Duration:</b> {course[0].duration}
                          </span>
                        )}
                        {course[0].highlight_1 && (
                          <span>
                            <b>Highlight:</b> {course[0].highlight_1}
                          </span>
                        )}
                        <br />
                        {course[0].highlight_2 && (
                          <span>
                            <b>Highlight:</b> {course[0].highlight_2}
                          </span>
                        )}
                      </div>
                    </div>
                    {course[0].category && (
                      <ul className="advertisement mb-4">
                        <li>
                          <p>
                            <strong>
                              <i className="lni-folder"></i> Categories:
                            </strong>
                            <a href="/category"> {course[0].category}</a>
                          </p>
                        </li>
                      </ul>
                    )}{" "}
                    <br />
                    <div className="ads-btn mb-4">
                      <a
                        href={"#register"}
                        className="btn btn-common"
                        onClick={()=>registerCourse()}
                      >
                        <i className="lni-phone-handset"></i> Register Now
                      </a>
                      <a
                        href="mail:culture.place@justbooksclc.com"
                        className="btn btn-common btn-reply"
                      >
                        <i className="lni-envelope"></i> Email
                      </a>
                      <a href="tel:9606111131" className="btn btn-common">
                        <i className="lni-phone-handset"></i> 9606111131
                      </a>
                    </div>
                    <div className="share">
                      <span>Share: </span>
                      <div className="social-link">
                        <a
                          className="facebook"
                          rel="noreferrer"
                          href="https://www.facebook.com/culture.myplace/"
                          target="_blank"
                        >
                          <i className="lni-facebook-filled"></i>
                        </a>
                        <a
                          className="twitter"
                          rel="noreferrer"
                          href="https://twitter.com/cultureplace"
                          target="_blank"
                        >
                          <i className="lni-twitter-filled"></i>
                        </a>
                        {/* <a className="linkedin" href="/category">
                          <i className="lni-linkedin-fill"></i>
                        </a>
                        <a className="google" href="/category">
                          <i className="lni-google-plus"></i>
                        </a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="description-info">
                <div className="row">
                  <div className="col-lg-8 col-md-6 col-xs-12">
                    <div className="description">
                      <h4>Description</h4>
                      <p>
                        Preparations for exams conducted by trinity college of
                        London Also learn few light songs to perform at
                        gatherings
                      </p>
                    </div>
                    <div className="description">
                      <h4>About the Trainer</h4>
                      <p>
                        Highly capable freelance teachers signedup with
                        JustBooks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Courses */}
          {relatedCourse.length > 0 && (
            <section className="featured-lis section-padding">
              <div className="container">
                <h3 className="section-title">Related Courses</h3>
                <div className="row">
                  {relatedCourse.map((relatedCourse) => {
                    return (
                      <RelatedCourseCard
                        key={relatedCourse.id}
                        id={relatedCourse.id}
                        img={
                          API.API_IMAGE_WITH_HTTPS +
                          "" +
                          relatedCourse.details_img
                        }
                        title={relatedCourse.course_name}
                        slug={relatedCourse.course_slug}
                        category={relatedCourse.category}
                        ageGroup={relatedCourse.age_group}
                        duration={relatedCourse.duration}
                        schedule={relatedCourse.Schedule}
                        price={relatedCourse.Fee}
                        view={"courseDetails"}
                      />
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </div>
      ) : null}

      <Footer />
    </div>
  );
}

export default CourseDetails;

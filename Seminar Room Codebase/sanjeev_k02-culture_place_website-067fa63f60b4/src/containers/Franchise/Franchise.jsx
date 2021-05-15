import React, { useState, useEffect } from "react";
import "./Franchise.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CourseCard from "../../components/CourseCard/CourseCard";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

import API from "../../config/env";
const axios = require("axios");

function Franchise(props) {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    homeCategory();
  }, []);

  const homeCategory = () => {
    axios
      .get(`${API.API_ENDPOINT}/home`, {
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
          let homeResult = response.data.result;
          setCourse(homeResult);
        } else {
          console.log("No Course data found", response.data.message);
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  return (
    <div className="body">
      <Header action={"franchise"} />
      <Breadcrumbs subBreadcrumbs={"Franshise"} mainBreadcrumbs={"Home"} />
      <div className="category-sec">
        <div className="main-container section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-1 col-md-12 col-xs-12 page-content"></div>
              <div className="col-lg-12 col-md-12 col-xs-12 page-content">
                <div className="product-filter">
                  <div className="short-name">
                    <span>Showing (1 - 6 products of 21 products)</span>
                  </div>
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#grid-view"
                      >
                        <i className="lni-grid"></i>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#list-view"
                      >
                        <i className="lni-list"></i>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="adds-wrapper">
                  <div className="tab-content">
                    <div id="grid-view" className="tab-pane fade">
                      <div className="row">
                        {course.length > 0
                          ? course.map((course) => {
                              return (
                                <CourseCard
                                  key={course.id}
                                  id={course.id}
                                  img={
                                    API.API_IMAGE_WITH_HTTPS +
                                    "" +
                                    course.details_img
                                  }
                                  title={course.course_name}
                                  slug={course.course_slug}
                                  category={course.category}
                                  ageGroup={course.age_group}
                                  duration={course.duration}
                                  schedule={course.Schedule}
                                  price={course.Fee}
                                  view={"franchise-grid"}
                                />
                              );
                            })
                          : null}
                      </div>
                    </div>
                    <div id="list-view" className="tab-pane fade active show">
                      <div className="row">
                        {course.length > 0
                          ? course.map((course) => {
                              return (
                                <CourseCard
                                  key={course.id}
                                  id={course.id}
                                  img={
                                    API.API_IMAGE_WITH_HTTPS +
                                    "" +
                                    course.details_img
                                  }
                                  title={course.course_name}
                                  slug={course.course_slug}
                                  category={course.category}
                                  ageGroup={course.age_group}
                                  duration={course.duration}
                                  schedule={course.Schedule}
                                  price={course.Fee}
                                  view={"franchise-list"}
                                />
                              );
                            })
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-1 col-md-12 col-xs-12 page-content"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Franchise;

import React, { useState, useEffect } from "react";
import "./Category.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Slider from "../../components/Slider/Slider";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import CourseCard from "../../components/CourseCard/CourseCard";

import categoryList from "../../config/category";
// import coursesList from "../../config/courses";
import API from "../../config/env";
const axios = require("axios");

function Category(props) {
  const [course, setCourse] = useState([]);
  const [successFlag, setSuccessFlag] = useState(false);
  const [message, setMessage] = useState("");

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

  const filterCategory = (id) => {
    console.log("id", id);
    if (id) {
      axios
        .get(`${API.API_ENDPOINT}/categoryFilter?category_id=${id}`, {
          crossDomain: true,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${API.TOKEN}`,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then(function (response) {
          console.log("category Filter", response);
          if (response.data && response.data.status) {
            let homeResult = response.data.result;
            if (homeResult.length > 0) {
              setCourse(homeResult);
            } else {
              setCourse(homeResult);
              setSuccessFlag(true);
              setMessage("No Result Found for Category!");
              setTimeout(() => {
                setSuccessFlag(false);
                homeCategory();
              }, 2500);
            }
          } else {
            console.log("No Course data for Filter", response.data.message);
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    } else {
      props.history.push("/category", null);
    }
  };

  return (
    <div className="body">
      <Header action={"category"} />
      <Slider isHeadTitle={false} />
      <div className="category-sec">
        <div className="main-container section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-12 col-xs-12 page-sidebar">
                <aside>
                  <div className="widget_search">
                    <form role="search" id="search-form">
                      <input
                        type="search"
                        className="form-control"
                        name="search"
                        placeholder="Search..."
                        id="search-input"
                        value=""
                      />
                      <button
                        type="submit"
                        id="search-submit"
                        className="search-btn"
                      >
                        <i className="lni-search"></i>
                      </button>
                    </form>
                  </div>

                  <div className="widget categories">
                    <h4 className="widget-title">All Categories</h4>
                    <ul className="categories-list">
                      {categoryList.map((category) => {
                        return (
                          <CategoryCard
                            key={category.id}
                            id={category.id}
                            icon={category.icon}
                            title={category.title}
                            count={category.count}
                            view={"category"}
                            filterCategory={() => filterCategory(category.id)}
                          />
                        );
                      })}
                    </ul>
                  </div>
                </aside>
              </div>
              <div className="col-lg-9 col-md-12 col-xs-12 page-content">
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
                {successFlag && (
                  <div className={"dashboard-box success-msg"}>
                    <h2 className="dashbord-title">{message}</h2>
                  </div>
                )}

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
                                  view={"grid"}
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
                                  view={"list"}
                                />
                              );
                            })
                          : null}
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="pagination-bar">
                  <nav>
                    <ul className="pagination justify-content-center">
                      <li className="page-item">
                        <a className="page-link active" href="/category">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="/category">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="/category">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="/category">
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Category;

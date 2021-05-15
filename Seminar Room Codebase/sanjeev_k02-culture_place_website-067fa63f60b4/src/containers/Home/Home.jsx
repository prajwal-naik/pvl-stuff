import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Slider from "../../components/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import CourseCard from "../../components/CourseCard/CourseCard";
import TestimonialCard from "../../components/TestimonialCard/TestimonialCard";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import CounterCard from "../../components/CounterCard/CounterCard";
import API from "../../config/env";

import categoryList from "../../config/category";
import coursesList from "../../config/courses";
import testimonialList from "../../config/testimonial";
import serviceList from "../../config/service";
import counterList from "../../config/counter";
const axios = require("axios");

function Home() {
  const [course, setCourse] = useState(coursesList);

  useEffect(() => {
    homeCourse();
  }, []);
  // console.log("course",course)

  const homeCourse = () => {
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
              homeCourse();
            }
          } else {
            console.log("No Course data for Filter", response.data.message);
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    }
  };

  return (
    <div className="body">
      <Header action={"home"} />
      <Slider isHeadTitle={true} />
      <div className="home-sec">
        {/* category section */}
        {/* <section className="categories-icon section-padding bg-drack">
          <div className="container">
            <div className="row">
              {categoryList.map((category) => {
                return (
                  <CategoryCard
                    key={category.id}
                    id={category.id}
                    icon={category.icon}
                    title={category.title}
                    count={category.count}
                    view={"home"}
                    filterCategory={() => filterCategory(category.id)}
                  />
                );
              })}
            </div>
          </div>
        </section> */}

        {/* courses section */}
        <section className="featured section-padding">
          <div className="container">
            <h1 className="section-title">Latest Courses</h1>
            <div className="row">
              {course.length > 0
                ? course.map((course) => {
                    return (
                      <CourseCard
                        key={course.id}
                        id={course.id}
                        img={API.API_IMAGE_WITH_HTTPS + "" + course.img}
                        title={course.title}
                        slug={course.course_slug}
                        category={course.category}
                        ageGroup={course.ageGroup}
                        duration={course.duration}
                        schedule={course.Schedule}
                        price={course.price}
                        view={"home"}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </section>

        {/* services section */}
        <section className="services section-padding">
          <div className="container">
            <div className="row">
              {serviceList.map((service) => {
                return (
                  <ServiceCard
                    key={service.id}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* counter section */}
        {/* <section className="counter-section section-padding">
          <div className="container">
            <div className="row">
              {counterList.map((counter) => {
                return (
                  <CounterCard
                    key={counter.id}
                    icon={counter.icon}
                    title={counter.title}
                    count={counter.count}
                  />
                );
              })}
            </div>
          </div>
        </section> */}

        {/* start testimonial */}
        <section className="testimonial section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div id="testimonials" className="owl-carousel">
                  {testimonialList.map((testimonial) => {
                    return (
                      <TestimonialCard
                        key={testimonial.id}
                        img={testimonial.image}
                        title={testimonial.title}
                        description={testimonial.description}
                        desgintation={testimonial.desgintation}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end testimonial */}
      </div>
      <Footer />
    </div>
  );
}

export default Home;

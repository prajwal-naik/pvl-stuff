import React from "react";
import "./About.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import TestimonialCard from "../../components/TestimonialCard/TestimonialCard";
import ServiceCard from "../../components/ServiceCard/ServiceCard";

import testimonialList from "../../config/testimonial";
import serviceList from "../../config/service";

function About() {
  return (
    <div className="body">
      <Header action={"about-us"} />
      <Breadcrumbs subBreadcrumbs={"About Us"} mainBreadcrumbs={"Home"} />
      <div className="about-sec">
        {/* start about */}
        <section id="about" className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-6 col-xs-12">
                <div className="about-wrapper">
                  <h2 className="intro-title">Join Hands With Us</h2>
                  <p className="intro-desc">Do you Want to</p>
                  <ul className="list-style">
                    <li>Discuss how you can bring your knowledge to masses?</li>
                    <li>
                      Conduct workshops in any intellectual/ creative areas?
                    </li>
                    <li>
                      Share your knowledge with people around you and away from
                      you?
                    </li>
                    <li>
                      Connect with people around your locality who share your
                      passion?
                    </li>
                    <li>Just bring Culture.place to community near you?</li>
                  </ul>
                  <p>
                    If you are a performing artist, visual artist, researcher,
                    teacher or someone who manages a community space, we have a
                    platform that you would love.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xs-12">
                <img
                  className="img-fluid"
                  src="assets/img/about/about.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        {/* end about */}

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

        {/* start services */}
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
        {/* end services */}
      </div>
      <Footer />
    </div>
  );
}

export default About;

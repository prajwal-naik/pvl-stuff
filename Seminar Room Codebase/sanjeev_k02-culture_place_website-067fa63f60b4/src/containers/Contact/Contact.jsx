import React, { useState } from "react";
import "./Contact.css";
import API from "../../config/env";
import { toast } from "react-toastify";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const axios = require("axios");
function Contact() {
  const [enquiry, setEnquiry] = useState({});
  const [isDisable, setIsDisable] = useState(false);

  const onInputchange = (event) => {
    console.log("event", event);
    setEnquiry((prevState) => ({
      ...prevState, // keep all other key-value pairs
      [event.target.name]: event.target.value, // update the value of specific key
    }));
  };

  const submitEnquiryRequest = () => {
    console.log("enquiry", enquiry);
    if (
      "name" in enquiry &&
      "email" in enquiry &&
      "phone" in enquiry &&
      "city" in enquiry &&
      "address" in enquiry &&
      "purpose" in enquiry &&
      "message" in enquiry
    ) {
      setIsDisable(true);
      const submitRequest = API.API_ENDPOINT + "/enquiry";
      axios
        .post(
          submitRequest,
          {
            name: enquiry.name,
            email: enquiry.email,
            phone: enquiry.phone,
            city: enquiry.city,
            address: enquiry.address,
            purpose: enquiry.purpose,
            message: enquiry.message,
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
            toast.success(
              "Thanks Connecting With Us, will reach you as soon as possible",
              {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
            setIsDisable(true);
            setTimeout(() => {
              window.location.reload(false);
            }, 3000);
          } else {
            toast.error("Please try again later", {
              position: "top-right",
              autoClose: 2500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setIsDisable(false);
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
          setIsDisable(false);
        });
    } else {
      toast.error("All Field Required!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsDisable(false);
    }
  };

  const checkBotText = (event) => {
    var regex = /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,63}(:[0-9]{1,5})?(\/.*)?/g;
    if (
      regex.test(event.target.value) ||
      event.target.value.indexOf(".jpg") > 0 ||
      event.target.value.indexOf(".png") > 0 ||
      event.target.value.indexOf(".gif") > 0
    ) {
      console.log("chat bot");
      toast.error("We are detected some unwanted data in message fields!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      console.log("not chat bot");
      setEnquiry((prevState) => ({
        ...prevState, // keep all other key-value pairs
        [event.target.name]: event.target.value, // update the value of specific key
      }));
    }
  };

  return (
    <div className="body">
      <Header action={"contact"} />
      <Breadcrumbs subBreadcrumbs={"Contact"} mainBreadcrumbs={"Home"} />
      <div className="content-shrink">
        <section id="content" className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                <h2 className="contact-title">Send Message Us</h2>
                <form
                  id="contactForm"
                  className="contact-form"
                  data-toggle="validator"
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              placeholder="Name"
                              required
                              defaultValue={enquiry ? enquiry.name : ""}
                              onChange={(text) => onInputchange(text)}
                              data-error="Please enter your name"
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              placeholder="Email"
                              required
                              defaultValue={enquiry ? enquiry.email : ""}
                              onChange={(text) => onInputchange(text)}
                              data-error="Please enter your email"
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="phone"
                              name="phone"
                              placeholder="Phone Number"
                              required
                              defaultValue={enquiry ? enquiry.phone : ""}
                              onChange={(text) => onInputchange(text)}
                              data-error="Please enter your phone Number"
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="city"
                              name="city"
                              placeholder="City"
                              required
                              defaultValue={enquiry ? enquiry.city : ""}
                              onChange={(text) => onInputchange(text)}
                              data-error="Please enter your city"
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              name="address"
                              placeholder="Address"
                              required
                              defaultValue={enquiry ? enquiry.address : ""}
                              onChange={(text) => onInputchange(text)}
                              data-error="Please enter your address"
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="purpose"
                              name="purpose"
                              placeholder="Purpose"
                              required
                              defaultValue={enquiry ? enquiry.purpose : ""}
                              onChange={(text) => onInputchange(text)}
                              data-error="Please enter your Purpose"
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              placeholder="Massage"
                              name="message"
                              rows="10"
                              data-error="Write your message"
                              required
                              defaultValue={enquiry ? enquiry.message : ""}
                              onChange={(text) => checkBotText(text)}
                            ></textarea>
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button
                        type="button"
                        id="button"
                        className="btn btn-common"
                        disabled={isDisable}
                        onClick={() => submitEnquiryRequest()}
                      >
                        {isDisable ? "Submitting...." : "Submit Now"}
                      </button>
                      <div className="clearfix"></div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                <h2 className="contact-title">Get In Touch</h2>
                <div className="information">
                  <p>
                    Online Workshops For Young Minds by Celebrities & Experts
                    Just pick your courses & attend live classes
                  </p>
                  <div className="contact-datails">
                    <div className="icon">
                      <i className="lni-map-marker icon-radius"></i>
                    </div>
                    <div className="info">
                      <h3>Address</h3>
                      <span className="detail">
                        #1, Old No 86/2, 5th Main Road, <br />
                        Bull Temple Road (Kamat Bugle Rock), N.R Colony,
                        Bengaluru - 560019
                      </span>
                    </div>
                  </div>
                  {/* <div className="contact-datails">
                    <div className="icon">
                      <i className="lni-pointer icon-radius"></i>
                    </div>
                    <div className="info">
                      <h3>Have any Questions?</h3>
                      <span className="detail">
                        <a
                          href="https://preview.uideck.com/cdn-cgi/l/email-protection"
                          className="__cf_email__"
                          data-cfemail="bcefc9ccccd3cec8fcd1ddd5d092dfd3d1"
                        >
                          [email&#160;protected]
                        </a>
                      </span>
                    </div>
                  </div> */}
                  <div className="contact-datails">
                    <div className="icon">
                      <i className="lni-pointer icon-radius"></i>
                    </div>
                    <div className="info">
                      <h3>Email us</h3>
                      <span className="detail">
                        <a href="mail:culture.place@justbooksclc.com">
                          culture.place@justbooksclc.com
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="contact-datails">
                    <div className="icon">
                      <i className="lni-phone-handset icon-radius"></i>
                    </div>
                    <div className="info">
                      <h3>Call Us & Join us</h3>
                      <span className="detail">
                        Main Office: <a href="tel:080-40511711">080-40511711</a>
                        , <a href="tel:9606111131">9606111131</a>
                      </span>
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

export default Contact;

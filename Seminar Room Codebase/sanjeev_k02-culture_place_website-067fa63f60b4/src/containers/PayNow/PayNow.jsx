import React, { useEffect, useState } from "react";
import "./PayNow.css";
import { reactLocalStorage } from "reactjs-localstorage";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import API from "../../config/env";
const axios = require("axios");

function PayNow(props) {
  console.log("props", props);
  let history = useHistory();
  const [formData, setFormData] = useState(null);
  let localData = reactLocalStorage.getObject("user");

  useEffect(() => {
    if (
      Object.keys(localData).length === 0 &&
      localData.constructor === Object
    ) {
      toast.error("No active User Found!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history.push("/", null);
    }
  }, [history]);

  useEffect(() => {
    if (!props.location.state && props.location.state.data === null) {
      console.log("course Not Found");
      toast.error("Course Not Found", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history.push("/", null);
    } else {
      let formContent = props.location.state.data;
      setFormData(formContent);
    }
  }, [props.location.state, history]);
  console.log("formData", formData);

  // const backOperation = () => {
  //   history.goBack();
  // }

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  async function razorpayPayment() {
    console.log("payment process");
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    // creating a new order

    let amount, order_id, currency;
    try {
      const initiationPayment = API.API_ENDPOINT + "/initiationPayment";
      const response = await axios.post(
        initiationPayment,
        {
          amount: formData.course.Fee,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${API.TOKEN}`,
          },
        }
      );

      if (!response) {
        toast.error("Server error. Are you online?", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      if (response.data.status) {
        // Getting the order details back
        amount = response.data.result.amount;
        order_id = response.data.result.id;
        currency = response.data.result.currency;
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
        return;
      }
    } catch (err) {
      toast.error("Server error. Are you online?", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const options = {
      key: "rzp_test_G3W1XsDqK6oCmA", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Culture.Place",
      description: formData.course.course_name
        ? formData.course.course_name
        : "Register with course!",
      image: "https://cultureplace.in/images/main-logo.png",
      prefill: {
        name: formData.name ? formData.name : "",
        email: formData.email ? formData.email : "",
        contact: formData.phone ? formData.phone : "",
      },
      theme: {
        color: "#5fb346d4",
      },
      order_id: order_id,
      handler: async function (response) {
        console.log("handler", response);
        try {
          const finalPayment = API.API_ENDPOINT + "/finalPayment";
          const final_response = await axios.post(
            finalPayment,
            {
              user_id: localData.id,
              user_name: formData.name,
              phone: formData.phone,
              email: formData.email,
              city: formData.city,
              address: formData.address,
              details: formData.message
                ? formData.message
                : "I want to join new courses",
              course_id: formData.course.id,
              amount: formData.course.Fee,
              payment_order_id: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              sign: response.razorpay_signature,
              status: "captured",
            },
            {
              headers: {
                "Content-Type": "application/json",
                "x-access-token": `${API.TOKEN}`,
              },
            }
          );
          if (final_response.data.status) {
            // Getting the order details back
            toast.success("Payment Successfully Done!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            history.push("/", null);
          } else {
            toast.error(final_response.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } catch (err) {
          toast.error("Something went wrong, try again later!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="body">
      <Header action={"pay"} />
      <Breadcrumbs subBreadcrumbs={"Pay Now"} mainBreadcrumbs={"Home"} />
      <div className="content-shrink">
        <section id="content" className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2"></div>
              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                <h2 className="contact-title">Pay With Us</h2>

                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th scope="row">Name</th>
                      <td>{formData ? formData.name : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email</th>
                      <td>{formData ? formData.email : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row">Phone</th>
                      <td>{formData ? formData.phone : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row">Parent Name</th>
                      <td>{formData ? formData.parent_name : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row">Address</th>
                      <td>{formData ? formData.address : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row">Age</th>
                      <td>{formData ? formData.age : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row">Course Name</th>
                      <td>{formData ? formData.course.course_name : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row">Price</th>
                      <td>{formData ? formData.course.Fee : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row"></th>
                      <td>
                        <div className="ads-btn mb-1">
                          {/* <a
                            href="#pay"
                            onClick={()=> backOperation()}
                            className="btn btn-common btn-common-custom btn-reply"
                          >
                            Back
                          </a> */}
                          <button
                            className="btn btn-common btn-common-custom "
                            onClick={() => razorpayPayment()}
                          >
                            Pay Now
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2"></div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default PayNow;

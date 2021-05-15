import React from "react";
import "./Register.css";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

import API from "../../config/env";
const axios = require("axios");

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
      errorFlag: false,
      message: "",
      user_id: '',
      isDisable: false,
    };
    this.courseDetails = this.courseDetails.bind(this);
  }

  componentDidMount = async () => {
    if (!this.props.match.params && this.props.match.params.slug === null) {
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
      this.props.history.push("/", null);
    } else {
      // console.log("get",this.props.match.params.slug)
      let localData = reactLocalStorage.getObject("user");
      if ( Object.keys(localData).length === 0 && localData.constructor === Object ) {
        toast.error("No Active User Found!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.props.history.push("/", null);
      } else {
        this.setState({user_id : localData.id})
      }
      await this.courseDetails(this, this.props.match.params.slug);
    }
    console.log("course", this.state.course);
  };

  courseDetails = (that, title) => {
    console.log("that", that);
    axios
      .get(`${API.API_ENDPOINT}/courseDetailsWithTitle/${title}`, {
        crossDomain: true,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${API.TOKEN}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(function (response) {
        if (response.data && response.data.status) {
          let courseDetails = response.data.result[0];
          that.setState({
            course: courseDetails,
          });
        } else {
          console.log("No Course data found");
        }
      })
      .catch(function (error) {
        console.log("course error", error);
      });
  };

  onInputchange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  registerInitial = () => {
    const { history } = this.props;
    console.log("register initial");
    console.log("name", this.state);
    if (
      this.state.name === "undefined" ||
      this.state.name === undefined ||
      this.state.email === "undefined" ||
      this.state.email === undefined ||
      this.state.phone === "undefined" ||
      this.state.phone === undefined ||
      this.state.address === "undefined" ||
      this.state.address === undefined ||
      this.state.parent_name === "undefined" ||
      this.state.parent_name === undefined ||
      this.state.pincode === "undefined" ||
      this.state.pincode === undefined ||
      this.state.age === "undefined" ||
      this.state.age === undefined
    ) {
      toast.error("Please Enter Required Field!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      this.setState({isDisable : true});
      const registerInitiation = API.API_ENDPOINT + "/registerInitiation";
      axios
        .post(
          registerInitiation,
          {
            user_id: this.state.user_id,
            name_participant: this.state.name,
            age: this.state.age,
            parent_name: this.state.parent_name,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            pincode: this.state.pincode,
            details: this.state.details,
            course_id: this.state.course.id,
            course_name: this.state.course.course_name,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${API.TOKEN}`,
            },
          }
        )
        .then((response) => {
          console.log("register", response.data);
          if (response.data.status) {
            history.push("/pay", {
              data: this.state,
            });
          } else {
            console.log("faild");
            this.setState({isDisable : false});
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
          this.setState({isDisable : false});
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
    }
  };

  render() {
    return (
      <div className="body">
        <Header action={"register"} />
        <Breadcrumbs subBreadcrumbs={"Register Now"} mainBreadcrumbs={"Home"} />
        <div className="content-shrink">
          {this.state.course ? (
            <section id="content" className="section-padding">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-1 col-lg-1"></div>
                  <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10">
                    <h2 className="contact-title">Register With Us</h2>
                    {this.state.errorFlag && (
                      <div className={"dashboard-box error-msg"}>
                        <h2 className="dashbord-title">{this.state.message}</h2>
                      </div>
                    )}
                    <div
                      id="contactForm"
                      className="contact-form"
                      data-toggle="validator"
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="name"
                                  name="name"
                                  placeholder="Name Of Participant *"
                                  required
                                  data-error="Please enter your name"
                                  value={this.state.name}
                                  onChange={(text) => this.onInputchange(text)}
                                />
                                <div className="help-block with-errors"></div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="parent_name"
                                  name="parent_name"
                                  placeholder="Name of the Parent/Guardian (If participants are children)*"
                                  required
                                  data-error="Please enter your email"
                                  value={this.state.parent_name}
                                  onChange={(text) => this.onInputchange(text)}
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
                                  type="email"
                                  className="form-control"
                                  id="email"
                                  name="email"
                                  placeholder="Email *"
                                  required
                                  data-error="Please enter your email"
                                  value={this.state.email}
                                  onChange={(text) => this.onInputchange(text)}
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
                                  placeholder="Phone Number *"
                                  required
                                  data-error="Please enter your phone"
                                  value={this.state.phone}
                                  onChange={(text) => this.onInputchange(text)}
                                />
                                <div className="help-block with-errors"></div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="age"
                                  name="age"
                                  placeholder="Age *"
                                  required
                                  data-error="Please enter your age"
                                  value={this.state.age}
                                  onChange={(text) => this.onInputchange(text)}
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
                                  placeholder="Address *"
                                  id="address"
                                  name="address"
                                  rows="4"
                                  data-error="Enter you address"
                                  required
                                  value={this.state.address}
                                  onChange={(text) => this.onInputchange(text)}
                                ></textarea>
                                <div className="help-block with-errors"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="course_name"
                                  name="course_name"
                                  placeholder="Course Name *"
                                  required
                                  disabled
                                  data-error="Please Select Course Name"
                                  value={this.state.course.course_name ? this.state.course.course_name : ""}
                                  onChange={(text) => this.onInputchange(text)}
                                />
                                <div className="help-block with-errors"></div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="pincode"
                                  name="pincode"
                                  placeholder="Pincode *"
                                  required
                                  data-error="Please enter your pincode"
                                  value={this.state.pincode}
                                  onChange={(text) => this.onInputchange(text)}
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
                                  name="details"
                                  className="form-control"
                                  placeholder="Massage"
                                  rows="6"
                                  value={this.state.details}
                                  onChange={(text) => this.onInputchange(text)}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <input
                            type="hidden"
                            className="form-control"
                            id="course_id"
                            name="course_id"
                            value={this.state.course.id}
                          />
                          <button
                            type="submit"
                            id="submit"
                            className="btn btn-common"
                            disabled={this.state.isDisable}
                            onClick={() => this.registerInitial()}
                          >
                            {this.state.isDisable ? 'Waiting...' : 'Submit Now'}
                          </button>
                          <div
                            id="msgSubmit"
                            className="h3 text-center hidden"
                          ></div>
                          <div className="clearfix"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xs-12 col-sm-12 col-md-1 col-lg-1"></div>
                </div>
              </div>
            </section>
          ) : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Register);

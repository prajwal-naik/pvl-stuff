import React, { useState, useEffect } from "react";
import "./Video.css";

import { reactLocalStorage } from "reactjs-localstorage";
import { toast } from "react-toastify";

import Header from "../../components/Header/Header";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Footer from "../../components/Footer/Footer";

function Video(props) {
  const [isLogin, setIsLogin] = useState(false);
  let localData = reactLocalStorage.getObject("user");

  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    if (
      Object.keys(localData).length === 0 &&
      localData.constructor === Object
    ) {
      toast.error("User Not Found, Please enter correct mobile Number!!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      props.history.push("/mobile-number", null);
    } else {
      setIsLogin(true);
    }
  }, [localData, props.history]);

  return (
    <div className="body">
      <Header action={"trainer"} />
      <Breadcrumbs subBreadcrumbs={"Watch now"} mainBreadcrumbs={"Trainer"} />
      <section className="row video-details">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="section section--blue hero text-center">
            <div className="container">
              <div>
                <section className="manage-tag">
                  <div className="container">
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="manageyourtag main video-titles">
                          <div>
                            <h1 className="ng-binding">Learn how to go from 0 to 500k+ followers in 12 months.</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="video-section">
                  <div className="container video-section">
                    <div className="videoOverlay"></div>
                    <iframe
                      id="videoFrame"
                      title="Video frame"
                      width="100%"
                      height="480"
                      src="https://www.youtube.com/embed/p_PJbmrX4uk?rel=0&autohide=1&showinfo=0&controls=0&modestbranding=0"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""
                    ></iframe>
                  </div>
                </section>
                <div className="container form-group has-feedback owner-info">
                  <div className="row">
                    <div className="col-xs-12 col-sm-8 col-md-8">
                      <div className="info-inner">
                        <div className="row">
                          <div className="col-xs-2 col-md-3 profile-thumb-img">
                            <img
                              src="https://videotag.me/cdn/1589553618137_593.jpeg"
                              alt="profile"
                              className="profile-img"
                            />
                          </div>
                          <div className="col-xs-10 col-md-9 rel-video">
                            <div>
                              <span className="ng-binding">
                                Published on 27/11/2019
                              </span>
                            </div>
                            <div>
                              <p>
                                by<span className="ng-binding"> Jhon Doe</span>
                              </p>
                            </div>
                            <div className="manageyourtag">
                              <p
                                ng-bind-html="video_info.video_description"
                                className="ng-binding"
                              >
                                Inform, advertise, engage. Take a minute to
                                check what and how it can help you
                                know more about things around of you.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
      </section>
      <Footer />
    </div>
  );
}

export default Video;

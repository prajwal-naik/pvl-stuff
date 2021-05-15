import React, { useState, useEffect } from "react";
import "./Trainer.css";

import { Modal } from "react-bootstrap";
import { reactLocalStorage } from "reactjs-localstorage";
import { toast } from "react-toastify";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

function WatchModal(props) {
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

  const watchExpertShow = () => {
    console.log("watch Video Now", props);
    if(isLogin) {
      toast.info("Welcome to ExpertShaala, Now you have access to watch video!!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      props.props.history.push("/video", null);
    } else {
      props.props.history.push("/mobile-number", null);
    }
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {/* <h6>Know about Experts</h6> */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="login-form login-area trainer-login-area trainer-modal">
          <div className="speaker-modal">
            <div className="modal__wrapper row">
              <div className="col-md-5">
                <img
                  src="https://web-summit-avenger.imgix.net/production/avatars/original/6890877bfff3af84e99bd190b80f1052c7367c08.jpg"
                  alt="Joseph"
                  className="trainer-Image"
                />
              </div>
              <div className="modal__content  col-md-7">
                <div>
                  <h3 className="authorName">
                    Joseph Gordon-Levitt<span> at HitRecord</span>
                  </h3>
                  <h4 className="authorDateTime">Date: 17th April 2021</h4>
                  <h4 className="authorDateTime">Time: 07:50 PM</h4>
                  <br />

                  <h5 className="authorDateTime">About the session:</h5>
                  <h6>
                    Joseph's acting career spans the last three decades. He is
                    best known for 3rd Rock from the Sun, Inception, and (500)
                    Days of Summer. He also screenwrites and directs, and is the
                    co-founder of online creative collaboration community
                    HitRecord.
                  </h6>

                  <h5 className="authorDateTime">About the Speaker:</h5>
                  <h6>
                    Joseph's acting career spans the last three decades. He is
                    best known for 3rd Rock from the Sun, Inception, and (500)
                    Days of Summer. He also screenwrites and directs, and is the
                    co-founder of online creative collaboration community
                    HitRecord.
                  </h6>
                </div>
                <div className="widget_wrapper_btn">
                    {" "}
                    <button
                      className="ew-md-trigger ewp_widget_btnid btn--default btn--hero trainer-details-btn"
                      btn_id="0"
                      onClick={() =>  watchExpertShow()}
                    >
                      YES, SHOW ME HOW!
                    </button>{" "}
                  </div>
              </div>
              <div className="modal__close-btn"></div>
            </div>
            <div className="modal__overlay"></div>
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

function Trainer(props) {
  const [watch, setWatch] = useState(false);

  const handleShow = () => {
    console.log("Know More");
    setWatch(true);
  };

  return (
    <div className="body">
      <Header action={"trainer"} />
      <Breadcrumbs subBreadcrumbs={"Trainer"} mainBreadcrumbs={"Home"} />
      <WatchModal show={watch} onHide={() => setWatch(false)} props={props} />
      <div className="about-sec">
        <section className="mag-topic">
          <div className="container container-banner text-center">
            <div className="banner-content">
              {/* <h1>Free</h1> */}
              <h2>- Exclusive -</h2>
              <h1>Training</h1>
              <h5>
                Training classes to help you start or grow <br />
                your business.
              </h5>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm--12 col-md-6 col-lg-3 filter">
                <div className="topic-content-wrap watch-now">
                  <div className="topic-content">
                    <img
                      src="https://foundr.com/wp-content/uploads/2020/12/nathan-foto-ver.jpg"
                      alt="img"
                      className=" lazyloaded"
                    />
                    <div className="info">
                      <p className="title">
                        Learn how to go from 0 to 500k+ followers in 12 months.
                      </p>
                      <p className="teacher">
                        With <span>Nathan Chan</span>
                      </p>
                      <div className="mag-topic-btn">
                        <button onClick={() => handleShow()}>Know More</button>
                      </div>
                    </div>
                  </div>
                  <div className="topic">
                    <div className="sprite icon-insta"></div>
                    <p>
                      Topic <br />
                      <span>Instagram Growth</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm--12 col-md-6 col-lg-3 filter">
                <div className="topic-content-wrap watch-now">
                  <div className="topic-content">
                    <img
                      src="https://foundr.com/wp-content/uploads/2020/12/arman-foto-ver.jpg"
                      alt="img"
                      className=" lazyloaded"
                    />
                    <div className="info">
                      <p className="title">
                        Discover the "Attention Hacking" secrets for writing
                        high converting.
                      </p>
                      <p className="teacher">
                        With <span>Arman Assadi</span>
                      </p>
                      <div className="mag-topic-btn">
                        <button onClick={() => handleShow()}>Know More</button>
                      </div>
                    </div>
                  </div>
                  <div className="topic">
                    <div className="sprite icon-copywriting"></div>
                    <p>
                      Topic <br />
                      <span>Copywriting</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm--12 col-md-6 col-lg-3 filter">
                <div className="topic-content-wrap watch-now">
                  <div className="topic-content">
                    <img
                      src="https://foundr.com/wp-content/uploads/2020/12/Facebook-Ads_course-cover_301x534.png"
                      alt="img"
                      className=" lazyloaded"
                    />
                    <div className="info">
                      <p className="title">How to run Facebook ads.</p>
                      <p className="teacher">
                        With <span>Nick Shackelford</span>
                      </p>
                      <div className="mag-topic-btn">
                        <button onClick={() => handleShow()}>Know More</button>
                      </div>
                    </div>
                  </div>
                  <div className="topic">
                    <div className="sprite icon-finance"></div>
                    <p>
                      Topic <br />
                      <span>Facebook Ads</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm--12 col-md-6 col-lg-3 filter">
                <div className="topic-content-wrap watch-now">
                  <div className="topic-content">
                    <img
                      src="https://foundr.com/wp-content/uploads/2020/12/f_4F_free-platform_course.jpg"
                      alt="img"
                      className=" lazyloaded"
                    />
                    <div className="info">
                      <p className="title">Finance for founders.</p>
                      <p className="teacher">
                        With <span>Alexa Von Tobel</span>
                      </p>
                      <div className="mag-topic-btn">
                        <button onClick={() => handleShow()}>Know More</button>
                      </div>
                    </div>
                  </div>
                  <div className="topic">
                    <div className="sprite icon-finance"></div>
                    <p>
                      Topic <br />
                      <span>Finance</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm--12 col-md-6 col-lg-3 filter">
                <div className="topic-content-wrap watch-now">
                  <div className="topic-content">
                    <img
                      src="https://foundr.com/wp-content/uploads/2020/12/DEAL-FLOW_free-platform_course-cover1_301x534.png"
                      alt="img"
                      className=" lazyloaded"
                    />
                    <div className="info">
                      <p className="title">
                        DISCOVER THE "DEAL FLOW" SYSTEM FOR FINDING, NEGOTIATING
                        AND CLOSING ANY DEAL.
                      </p>
                      <p className="teacher">
                        With <span>Daymond John</span>
                      </p>
                      <div className="mag-topic-btn">
                        <button onClick={() => handleShow()}>Know More</button>
                      </div>
                    </div>
                  </div>
                  <div className="topic">
                    <div className="sprite icon-startup"></div>
                    <p>
                      Topic <br />
                      <span>Negotiation</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm--12 col-md-6 col-lg-3 filter">
                <div className="topic-content-wrap watch-now">
                  <div className="topic-content">
                    <img
                      src="https://foundr.com/wp-content/uploads/2020/12/Mitch-Harper_free-platform_course-cover1_301x534.png"
                      alt="img"
                      className=" lazyloaded"
                    />
                    <div className="info">
                      <p className="title">
                        How to start a tech startup and get your first customer
                        in 60 days.
                      </p>
                      <p className="teacher">
                        With <span>Mitch Harper</span>
                      </p>
                      <div className="mag-topic-btn">
                        <button onClick={() => handleShow()}>Know More</button>
                      </div>
                    </div>
                  </div>
                  <div className="topic">
                    <div className="sprite icon-startup"></div>
                    <p>
                      Topic <br />
                      <span>Start-Ups</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm--12 col-md-6 col-lg-3 filter">
                <div className="topic-content-wrap watch-now">
                  <div className="topic-content">
                    <img
                      src="https://foundr.com/wp-content/uploads/2020/12/RFC_free-platform_course-cover2_301x534.png"
                      alt="img"
                      className=" lazyloaded"
                    />
                    <div className="info">
                      <p className="title">
                        HOW WE CREATE A 7-FIGURE COURSE FROM SCRATCH.
                      </p>
                      <p className="teacher">
                        With <span>Nathan Chan</span>
                      </p>
                      <div className="mag-topic-btn">
                        <button onClick={() => handleShow()}>Know More</button>
                      </div>
                    </div>
                  </div>
                  <div className="topic">
                    <div className="sprite icon-startup"></div>
                    <p>
                      Topic <br />
                      <span>CREATING AN ONLINE COURSE</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm--12 col-md-6 col-lg-3 filter">
                <div className="topic-content-wrap watch-now">
                  <div className="topic-content">
                    <img
                      src="https://foundr.com/wp-content/uploads/2020/12/gretta-foto-ver.jpg"
                      alt="img"
                      className=" lazyloaded"
                    />
                    <div className="info">
                      <p className="title">
                        Learn how you can start a profitable online store in 12
                        weeks or less.
                      </p>
                      <p className="teacher">
                        With <span>Gretta Van Riel</span>
                      </p>
                      <div className="mag-topic-btn">
                        <button onClick={() => handleShow()}>Know More</button>
                      </div>
                    </div>
                  </div>
                  <div className="topic">
                    <div className="sprite icon-ecommerce"></div>
                    <p>
                      Topic <br />
                      <span>Starting an E-commerce Business</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* start trainer */}
        {/* <section id="trainer" className="section-padding">
          <div className="container container-trainer">
            <div className="card">
              <img
                src="https://lh3.googleusercontent.com/ytP9VP86DItizVX2YNA-xTYzV09IS7rh4WexVp7eilIcfHmm74B7odbcwD5DTXmL0PF42i2wnRKSFPBHlmSjCblWHDCD2oD1oaM1CGFcSd48VBKJfsCi4bS170PKxGwji8CPmehwPw=w200-h247-no"
                alt="Person"
                className="card__image"
              />
              <p className="card__name">Lily-Grace Colley</p>
              <div className="grid-container grid-container-trainer">
                <div className="grid-child-posts">156 Post</div>

                <div className="grid-child-followers">1012 Likes</div>
              </div>
              <ul className="social-icons">
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-instagram-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-twitter-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-facebook-filled"></i>
                  </a>
                </li>
              </ul>
              <button className="btn draw-border">Follow</button>
            </div>
            <div className="card">
              <img
                src="https://lh3.googleusercontent.com/oUUiPB9sq3ACq4bUaRmo8pgvC4FUpRRrQKcGIBSOsafawZfRpF1vruFeYt6uCfL6wGDQyvOi6Ez9Bpf1Fb7APKjIyVsft7FLGR6QqdRFTiceNQBm1In9aZyrXp33cZi9pUNqjHASdA=s170-no"
                alt="Person"
                className="card__image"
              />
              <p className="card__name">Murray Reeve</p>
              <div className="grid-container">
                <div className="grid-child-posts">305 Post</div>

                <div className="grid-child-followers">2643 Likes</div>
              </div>
              <ul className="social-icons">
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-instagram-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-twitter-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-facebook-filled"></i>
                  </a>
                </li>
              </ul>
              <button className="btn draw-border">Follow</button>
            </div>
            <div className="card">
              <img
                src="https://lh3.googleusercontent.com/pZwZJ5HIL5iKbA91UGMUIPR0VJWa3K0vOGzDZmY6wU3EJBUdfsby3VEyxU162XxTyOyP3D154tjkr-4Jgcx8lygYUR8eB-jVmld4dsHi1c-mE_A8jKccseAG7bdEwVrcuuk6ciNtSw=s170-no"
                alt="Person"
                className="card__image"
              />
              <p className="card__name">Bianca Serrano</p>
              <div className="grid-container">
                <div className="grid-child-posts">902 Post</div>

                <div className="grid-child-followers">1300 Likes</div>
              </div>
              <ul className="social-icons">
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-instagram-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-twitter-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-facebook-filled"></i>
                  </a>
                </li>
              </ul>
              <button className="btn draw-border">Follow</button>
            </div>
            <div className="card">
              <img
                src="https://lh3.googleusercontent.com/ytP9VP86DItizVX2YNA-xTYzV09IS7rh4WexVp7eilIcfHmm74B7odbcwD5DTXmL0PF42i2wnRKSFPBHlmSjCblWHDCD2oD1oaM1CGFcSd48VBKJfsCi4bS170PKxGwji8CPmehwPw=w200-h247-no"
                alt="Person"
                className="card__image"
              />
              <p className="card__name">Lily-Grace Colley</p>
              <div className="grid-container grid-container-trainer">
                <div className="grid-child-posts">156 Post</div>

                <div className="grid-child-followers">1012 Likes</div>
              </div>
              <ul className="social-icons">
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-instagram-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-twitter-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-facebook-filled"></i>
                  </a>
                </li>
              </ul>
              <button className="btn draw-border">Follow</button>
            </div>
            <div className="card">
              <img
                src="https://lh3.googleusercontent.com/ytP9VP86DItizVX2YNA-xTYzV09IS7rh4WexVp7eilIcfHmm74B7odbcwD5DTXmL0PF42i2wnRKSFPBHlmSjCblWHDCD2oD1oaM1CGFcSd48VBKJfsCi4bS170PKxGwji8CPmehwPw=w200-h247-no"
                alt="Person"
                className="card__image"
              />
              <p className="card__name">Lily-Grace Colley</p>
              <div className="grid-container grid-container-trainer">
                <div className="grid-child-posts">156 Post</div>

                <div className="grid-child-followers">1012 Likes</div>
              </div>
              <ul className="social-icons">
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-instagram-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-twitter-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-facebook-filled"></i>
                  </a>
                </li>
              </ul>
              <button className="btn draw-border">Follow</button>
            </div>
            <div className="card">
              <img
                src="https://lh3.googleusercontent.com/ytP9VP86DItizVX2YNA-xTYzV09IS7rh4WexVp7eilIcfHmm74B7odbcwD5DTXmL0PF42i2wnRKSFPBHlmSjCblWHDCD2oD1oaM1CGFcSd48VBKJfsCi4bS170PKxGwji8CPmehwPw=w200-h247-no"
                alt="Person"
                className="card__image"
              />
              <p className="card__name">Lily-Grace Colley</p>
              <div className="grid-container grid-container-trainer">
                <div className="grid-child-posts">156 Post</div>

                <div className="grid-child-followers">1012 Likes</div>
              </div>
              <ul className="social-icons">
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-instagram-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-twitter-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="/trainer" onClick={handleShow}>
                    <i className="lni-facebook-filled"></i>
                  </a>
                </li>
              </ul>
              <button className="btn draw-border">Follow</button>
            </div>
          </div>
        </section> */}
        {/* end trainer */}
      </div>
      <Footer />
    </div>
  );
}

export default Trainer;

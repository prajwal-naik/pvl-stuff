import React, { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import "./Header.css";

function Header(props) {
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

  return (
    <div className="head">
      <header id="header-wrap">
        <nav className="navbar navbar-expand-lg scrolling-navbar">
          <div className="container">
            <div className="navbar-header">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#main-navbar"
                aria-controls="main-navbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
                <span className="lni-menu"></span>
                <span className="lni-menu"></span>
                <span className="lni-menu"></span>
              </button>
              <a href="/" className="navbar-brand">
                <img src="/assets/img/Whitelogo.png" alt="" />
              </a>
            </div>
            <div className="collapse navbar-collapse" id="main-navbar">
              <ul className="navbar-nav ml-auto">
                <li
                  className={
                    "nav-item " + (props.action === "home" ? "active" : "")
                  }
                >
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
                {/* <li
                  className={
                    "nav-item " + (props.action === "category" ? "active" : "")
                  }
                >
                  <a className="nav-link" href="/category">
                    Categories
                  </a>
                </li> */}
                <li
                  className={
                    "nav-item " + (props.action === "trainer" ? "active" : "")
                  }
                >
                  <a className="nav-link" href="/trainer">
                    All Subscribe
                  </a>
                </li>
                {/* <li
                  className={
                    "nav-item " + (props.action === "franchise" ? "active" : "")
                  }
                >
                  <a className="nav-link" href="/franchise">
                    Franchise
                  </a>
                </li> */}
                {/* <li
                  className={
                    "nav-item " + (props.action === "quiz" ? "active" : "")
                  }
                >
                  <a className="nav-link" href="/quiz">
                    Quiz
                  </a>
                </li> */}
                <li
                  className={
                    "nav-item " + (props.action === "about-us" ? "active" : "")
                  }
                >
                  <a className="nav-link" href="/about-us">
                    About Us
                  </a>
                </li>
                <li
                  className={
                    "nav-item " + (props.action === "contact" ? "active" : "")
                  }
                >
                  <a className="nav-link" href="/contact">
                    Contact
                  </a>
                </li>
                {isLogin && (
                  <li
                    className={
                      "nav-item " +
                      (props.action === "account-profile-setting"
                        ? "active"
                        : "")
                    }
                  >
                    <a className="nav-link" href="/account-profile-setting">
                      <i className="lni-user"></i> My Account
                    </a>
                  </li>
                )}
                {!isLogin && (
                  <React.Fragment>
                    <li
                      className={
                        "nav-item " +
                        (props.action === "mobile-number" ? "active" : "")
                      }
                    >
                      <a className="nav-link" href="/mobile-number">
                        <i className="lni-lock"></i> Log In
                      </a>
                    </li>
                    {/* <li
                      className={
                        "nav-item " +
                        (props.action === "signup" ? "active" : "")
                      }
                    >
                      <a className="nav-link" href="/signup">
                        <i className="lni-user"></i> Signup
                      </a>
                    </li> */}
                  </React.Fragment>
                )}
              </ul>
              {/* <ul className="sign-in">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#home"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="lni-user"></i> My Account
                  </a>
                  <div className="dropdown-menu">
                    {isLogin && (
                      <a
                        className={
                          "dropdown-item " +
                          (props.action === "account-profile-setting"
                            ? "active"
                            : "")
                        }
                        href="/account-profile-setting"
                      >
                        <i className="lni-home"></i> Account Home
                      </a>
                    )}
                    {!isLogin && (
                      <React.Fragment>
                        <a
                          className={
                            "dropdown-item " +
                            (props.action === "mobile-number" ? "active" : "")
                          }
                          href="/mobile-number"
                        >
                          <i className="lni-lock"></i> Log In
                        </a>
                        <a
                          className={
                            "dropdown-item " +
                            (props.action === "signup" ? "active" : "")
                          }
                          href="/signup"
                        >
                          <i className="lni-user"></i> Signup
                        </a>
                      </React.Fragment>
                    )}
                  </div>
                </li>
              </ul> */}
            </div>
          </div>

          <ul className="mobile-menu">
            <li>
              <a href="/">Home</a>
            </li>
            {/* <li>
              <a href="/category">Categories</a>
            </li> */}
            <li>
              <a href="/trainer">All Subscribe</a>
            </li>
            {/* <li>
              <a href="/franchise">Franchise</a>
            </li>
            <li>
              <a href="/quiz">Quiz</a>
            </li> */}
            <li>
              <a href="/about-us">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            {isLogin && (<li>
              <a href="/account-profile-setting">
                <i className="lni-home"></i> Account Home
              </a>
            </li>
            )}
            {!isLogin && (
              <React.Fragment>
                <li>
                  <a href="/mobile-number">
                    <i className="lni-lock"></i> Log In
                  </a>
                </li>
                {/* <li>
                  <a href="/signup">
                    <i className="lni-user"></i> Signup
                  </a>
                </li> */}
              </React.Fragment>
            )}
            {/* <li>
              <a className="active" href="#account">
                My Account
              </a>
              <ul className="dropdown">
                <li>
                  <a href="/account-profile-setting">
                    <i className="lni-home"></i> Account Home
                  </a>
                </li>
                <li>
                  <a href="/mobile-number">
                    <i className="lni-lock"></i> Log In
                  </a>
                </li>
                <li>
                  <a href="/signup">
                    <i className="lni-user"></i> Signup
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;

import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="head">
      <footer>
        <div id="copyright">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="site-info float-left">
                  <p className="footerTxt">
                    All copyrights reserved &copy; 2021 - Designed by
                    <a href="http://cultureplace.in/" rel="nofollow">
                      {" "}
                      Culture.Place
                    </a>
                  </p>
                </div>
                <div className="float-right">
                  <ul className="footer-social">
                    <li>
                      <a className="facebook" rel="noreferrer" href="https://www.facebook.com/culture.myplace/" target="_blank">
                        <i className="lni-facebook-filled"></i>
                      </a>
                    </li>
                    <li>
                      <a className="twitter" rel="noreferrer" href="https://twitter.com/cultureplace" target="_blank">
                        <i className="lni-twitter-filled"></i>
                      </a>
                    </li>
                    {/* <li>
                      <a className="linkedin" href="/">
                        <i className="lni-linkedin-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a className="google-plus" href="/">
                        <i className="lni-google-plus"></i>
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

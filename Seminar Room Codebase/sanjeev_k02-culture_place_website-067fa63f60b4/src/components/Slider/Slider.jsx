import React, { useState } from "react";
import "./Slider.css";
import { useHistory } from "react-router-dom";

function Slider(props) {
  const history = useHistory();
  const [title, setTitle] = useState("");

  const onInputchange = (event) => {
    setTitle(event.target.value);
  };

  const searchNow = () => {
    if (title === "" || title === undefined) {
      document.getElementById("titleError").innerHTML =
        "Please Enter some keywords !";
      return false;
    }

    document.getElementById("titleError").innerHTML = "";
    history.push("/search/" + title);
  };

  return (
    <div className="slider">
      <div id="hero-area">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10 col-lg-10 col-xs-10 text-center">
              <div
                className={props.isHeadTitle ? "contents" : "contents-dynamic"}
              >
                {props.isHeadTitle && (
                  <div className="head_title">
                    <h1 className="head-title">
                      Welcome to <span className="year">Culture.Place</span>
                    </h1>
                    <h6>
                      ONLINE WORKSHOPS FOR YOUNG MINDS BY CELEBRITIES & EXPERTS
                    </h6>
                    <p>Just pick your courses & attend live classes</p>
                  </div>
                )}
                <div className="search-bar">
                  <div className="search-inner">
                    <form className="search-form">
                      <div className="form-group inputwithicon form-updated">
                        <i className="lni-tag"></i>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          className="form-control searchClass"
                          placeholder="Enter Product Keyword"
                          defaultValue={title ? title : ""}
                          onChange={(text) => onInputchange(text)}
                        />
                        <div
                          className="help-block with-errors"
                          id="titleError"
                        ></div>
                      </div>
                      <div className="form-group inputwithicon form-updated">
                        <i className="lni-menu"></i>
                        <div className="select">
                          <select className="category">
                            <option className="option" value="none">
                              Categories
                            </option>
                            <option className="option" value="none">
                              Music
                            </option>
                            <option className="option" value="none">
                              Dance
                            </option>
                            <option className="option" value="none">
                              Education
                            </option>
                          </select>
                        </div>
                      </div>
                      <button
                        className="btn btn-common"
                        type="button"
                        onClick={() => searchNow()}
                      >
                        <i className="lni-search"></i> Search Now
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;

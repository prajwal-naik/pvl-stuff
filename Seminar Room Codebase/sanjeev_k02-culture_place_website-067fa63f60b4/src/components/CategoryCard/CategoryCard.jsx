import React from "react";
import "./CategoryCard.css";

function CategoryCard(props) {
  return (
    <React.Fragment>
      {props.view === "home" ? (
        <div className="col-lg-2 col-md-6 col-sm-6 col-xs-6 mobileView">
          <a href="#filter" onClick={() => props.filterCategory(props.id)}>
            <div className="icon-box">
              <div className="icon">
                <i className={props.icon}></i>
              </div>
              <h4>{props.title}</h4>
            </div>
          </a>
        </div>
      ) : (
        <li>
          <a href="#filter" onClick={() => props.filterCategory(props.id)}>
            <i className={props.icon}></i>
            {props.title}{" "}
            <span className="category-counter">({props.count})</span>
          </a>
        </li>
      )}
    </React.Fragment>
  );
}

export default CategoryCard;

import React from "react";
import "./WishlistCard.css";

function WishlistBody (props) {
  return (
    <tr data-category={props.status === 'active' ? 'active' : 'deleted'}>
      <td className="photo">
        <img className="img-fluid" src={props.img} alt="" />
      </td>
      <td data-title="Title">
        <h3>{props.title}</h3>
        {props.duration && <span>Duration: {props.duration}</span>}
        {/* {props.highlight_2 && <span>Highlight: {props.highlight_2}</span>} */}
      </td>
      {/* <td data-title="Category">
        <span className="adcategories">{props.category}</span>
      </td> */}
      <td data-title="Category">
        <span className="highlight">{props.highlight_2}</span>
      </td>
      <td data-title="Ad Status">
        <span className={"adstatus " + (props.status === "active" ? "adstatusactive" : "adstatusdeleted")}>{props.status}</span>
      </td>
      <td data-title="Action">
        <div className="btns-actions">
          <a className="btn-action btn-view" href={"/details/"+props.slug}>
            <i className="lni-eye"></i>
          </a>
          <a className="btn-action btn-delete" href="#wishlist" onClick={() => props.removeWishlist(props.wishlist_id)}>
            <i className="lni-trash"></i>
          </a>
        </div>
      </td>
    </tr>
  );
}

function WishlistHeader (props) {
  return (
    <th>{props.title}</th>
  );
}

export { WishlistBody, WishlistHeader };

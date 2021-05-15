import React from "react";
import "./PaymentCard.css";

function PaymentBody (props) {
  return (
    <tr data-category={props.categoryAction === 'captured' ? 'active' : 'deleted'}>
      <td className="photo">
        <img className="img-fluid" src={props.img} alt="" />
      </td>
      <td data-title="Title">
        <h3>{props.title}</h3>
        <span>Tranasction ID: {props.tranasctionId}</span>
      </td>
      <td data-title="Category">
        <h3>{props.email}</h3>
        <span>Phone no: {props.phone}</span>
      </td>
      <td data-title="Ad Status">
        <span className={"adstatus " + (props.categoryAction === "captured" ? "adstatusactive" : "adstatusdeleted")}>{props.categoryAction}</span>
      </td>
      <td data-title="Price">
        <h3>Rs. {props.price}</h3>
      </td>
      <td data-title="Action">
        <div className="btns-actions">
          <a className="btn-action btn-view" href={"/details/"+props.slug}>
            <i className="lni-eye"></i>
          </a>
        </div>
      </td>
    </tr>
  );
}

function PaymentHeader (props) {
  return (
    <th>{props.title}</th>
  );
}

export { PaymentBody, PaymentHeader };

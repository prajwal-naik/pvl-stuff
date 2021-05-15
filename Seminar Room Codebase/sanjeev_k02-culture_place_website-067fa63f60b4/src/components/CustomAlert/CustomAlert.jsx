import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import "./CustomAlert.css";

function CustomAlert(props) {
  return (
    <SweetAlert
      custom
      showCancel
      showCloseButton
      confirmBtnText={props.confirmBtnText}
      cancelBtnText={props.cancelBtnText}
      confirmBtnBsStyle={props.confirmBtnBsStyle}
      cancelBtnBsStyle={props.cancelBtnBsStyle}
      customIcon={props.customIcon ? props.customIcon : "https://www.kindpng.com/picc/m/312-3120781_logout-icon-png-transparent-png.png"}
      title={props.title}
      onConfirm={props.onConfirm}
      onCancel={props.onCancel}
    >
      {props.description}
    </SweetAlert>
  );
}

export default CustomAlert;

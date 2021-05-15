import API from "./env";
import { reactLocalStorage } from "reactjs-localstorage";
const axios = require("axios");

let paymentList = [];
// Make a request for a user with a given IDlet localData = reactLocalStorage.getObject("user");
let localData = reactLocalStorage.getObject("user");
console.log("payment", localData);
if (Object.keys(localData).length === 0 && localData.constructor === Object) {
  console.log("User Not LoggedIn");
} else {
  axios
    .get(`${API.API_ENDPOINT}/transaction/${localData.id}`, {
      crossDomain: true,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${API.TOKEN}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(function (response) {
      // handle success
      // console.log("response", response);
      if (response.data && response.data.status) {
        if (response.data.result.length > 0) {
          let paymentResult = response.data.result;
          paymentList.push(...paymentResult);
        } else {
          console.log("No payment data found");
        }
      } else {
        console.log("No payment data found", response.data.message);
      }
    })
    .catch(function (error) {
      // handle error
      console.log("error", error);
    });
}

const paymentField = [
  { id: 1, title: "Photo" },
  { id: 2, title: "Title" },
  { id: 3, title: "User Info" },
  { id: 4, title: "Status" },
  { id: 5, title: "Price" },
  { id: 6, title: "Action" },
];

export { paymentList, paymentField };

import API from "./env";
import { reactLocalStorage } from "reactjs-localstorage";
const axios = require("axios");

let wishlistList = [];
// Make a request for a user with a given ID
let localData = reactLocalStorage.getObject("user");
console.log("wishlist", localData);
if (Object.keys(localData).length === 0 && localData.constructor === Object) {
  console.log("User Not LoggedIn");
} else {
  axios
    .post(
      `${API.API_ENDPOINT}/wishlist`,
      {
        user_id: localData.id,
      },
      {
        crossDomain: true,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${API.TOKEN}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then(function (response) {
      // handle success
      // console.log("response", response);
      if (response.data && response.data.status) {
        if (response.data.result.length > 0) {
          let wishlistResult = response.data.result;
          wishlistList.push(...wishlistResult);
        } else {
          console.log("No wishlist data found");
        }
      } else {
        console.log("No wishlist data found", response.data.message);
      }
    })
    .catch(function (error) {
      // handle error
      console.log("error", error);
    });
}

const wishlistField = [
  { id: 1, title: "Photo" },
  { id: 2, title: "Title" },
  //   { id: 3, title: "Category" },
  { id: 4, title: "Highlight" },
  { id: 5, title: "Status" },
  { id: 6, title: "Action" },
];

export { wishlistList, wishlistField };

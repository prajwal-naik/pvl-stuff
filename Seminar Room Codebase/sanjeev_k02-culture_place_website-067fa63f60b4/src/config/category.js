

import API from "./env";
const axios = require("axios");

let categoryApiList = [];
axios
  .get(
    `${API.API_ENDPOINT}/category`,
    {
      crossDomain: true,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${API.TOKEN}`,
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
  .then(function (response) {
      console.log("cat",response);
    if (response.data && response.data.status) {
        if(response.data.result.length > 0 ){
            let categoryResult = response.data.result;
            categoryApiList.push(
                ...categoryResult
            )
        } else {
            console.log("No category data found")
        }
    } else {
        console.log("No category data found", response.data.message)
    }
  })
  .catch(function (error) {
    console.log("error", error);
  }); 
  console.log("categoryApiList",categoryApiList);


const categoryList = [
    {
        id:11,
        icon: 'lni-brush',
        title:"Art",
        count: 6
    },
    {
        id:10,
        icon: 'lni-game',
        title:"Games",
        count: 12
    },
    {
        id:7,
        icon: 'lni-graduation',
        title:"Education",
        count: 3
    },
    {
        id:8,
        icon: 'lni-heart',
        title:"Health",
        count: 17
    },
    {
        id:5,
        icon: 'lni-hand',
        title:"Dance",
        count: 5
    },
    {
        id:6,
        icon: 'lni-display',
        title:"Others",
        count: 2
    }
  ]; 
  
  export default categoryList;
  
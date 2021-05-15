const jwt = require("jsonwebtoken");
const config = require("../config.json");
const models = require("../controller/index");
const User = models.UserModel;
var messages = require("../constants.json")["messages"];

var androidNonSecurePaths = [
  "/userLogin",
  "/userSocialLogin",
  "/checkAlreadyRegisteredMobile",
  "/checkAlreadyRegisteredEmail",
  "/removeFcmToken",
  "/user/signUp",
];

var iosNonSecurePaths = [
  "/home/howItWorks",
  "/bestOffers",
  "/home/testimonials",
  "/home/bookWithUs",
];

var nonSecurePaths = [];

var verifyToken = (req, res, next) => {
  var _ = require("underscore");

  nonSecurePaths = androidNonSecurePaths.concat(iosNonSecurePaths);

  if (_.contains(nonSecurePaths, req.path)) return next();
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(200).send({
      response: 70,
      message: "No token provided!",
    });
  }
  
  if(token == config.token) {
	next();
  } else {
	return res.status(200).send({
        response: 71,
        message: "Unauthorized!",
      });
  }
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;

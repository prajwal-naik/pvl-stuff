require("./global_functions");

var express = require("express");
var app = express();
var routes = require("./controller/index.js");
var bodyParser = require("body-parser");
var fileUpload = require("express-fileupload");
var https = require("https");
var fs = require("fs");
var cors = require('cors')

const { verifyToken } = require("./middleware/jwtAuth");

app.use(bodyParser.json({ limit: "1000mb" }));

app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));

app.use(fileUpload());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(
  cors({
      credentials: true,
      origin: [
          'http://localhost:8030',
          'http://localhost:8012',
          'http://52.66.5.24:8030',
          'http://192.168.1.16:8030'
      ]
  }),
)

app.all("*", verifyToken);

app.get("/", routes.pwd);
app.get("/home", routes.home);
app.get("/courseDetails/:course_id", routes.getCourseDetails);
app.get("/allCoursesName", routes.getAllCoursesName);
app.get("/category", routes.getAllCategory);
app.get("/releatedCourses/:course_id", routes.getReleatedCourses);
app.get("/htmlToText",routes.HtmlToText);
app.get("/courseDetailsWithTitle/:slug", routes.getCourseDetailsWithTitle);
app.get("/releatedCoursesWithTitle/:slug", routes.getReleatedCoursesWithTitle);

// wishlist APIs
app.post("/wishlist", routes.getAllWishlist);
app.post("/addWishlist", routes.addWishlist);
app.post("/removeWishlist", routes.removeWishlist);

// Search Courses
app.get("/search", routes.searchCoursesByTitle);
app.get("/categoryFilter", routes.searchCoursesByCategory);

// pushNotification
app.post('/saveFcmToken', routes.save_fcm_token);
app.post('/removeFcmToken', routes.remove_fcm_token);
app.post('/sendPushNotification', routes._sendPushNotification);

// Transaction
app.get("/transaction/:user_id", routes.getAllTransaction);
app.get("/requestedCourses/:user_id", routes.getAllRequestedCourses);

// Login
app.post('/requestOTP', routes.requestOTP);
app.post('/validateOTP', routes.validateOTP);
// Web Login and Regsiter
app.post('/webRegister', routes.requestWebRegister);
app.post('/webLogin', routes.validateWebLogin);
app.post('/forgotPassword', routes.forgotPassword);

// Profile
app.get('/profile/:user_id', routes.profile);
app.put('/updateProfile/:user_id', routes.updateProfile);

// Payment
app.post("/registerInitiation", routes.registerInitiation);
app.post("/initiationPayment", routes.initiationPayment);
app.post("/finalPayment", routes.finalPayment);

// Enquiry 
app.post("/enquiry", routes.sendEnquiry);

app.get("/appupdate", routes.checkAppVersion);

var server = app.listen(8012, function () {
  var port = server.address().port;
  console.log("Running on port no " + port);
});

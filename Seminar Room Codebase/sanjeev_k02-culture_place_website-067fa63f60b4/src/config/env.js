const API_ENDPOINT = 'http://52.66.5.24:8012'; // Live server
const API_IMAGE_WITH_HTTPS = 'https://cultureplace.in/admin/uploads/course_img/'; // with https
const API_IMAGE_WITHOUT_HTTPS = 'http://65.0.41.187:8061/admin/uploads/course_img/'; //without https
const API_AFTERLOGIN_POINT = 'https://cultureplace.in/'; // Live server 

// const API_ENDPOINT = 'http://localhost:8012'; // Local server
// const API_IMAGE_WITH_HTTPS = 'http://localhost:7070/admin/uploads/course_img/'; // with https
// const API_IMAGE_WITHOUT_HTTPS = 'http://localhost:7070/admin/uploads/course_img/'; //without https
// const API_AFTERLOGIN_POINT = 'https://cultureplace.in/'; // Local server 

const TOKEN = "culture_place_qwerty";

// RAZORPAY_ENVIRONMENT TEST
const RZP_API_KEY = 'rzp_test_G3W1XsDqK6oCmA'; // Test Credentials
const RZP_SECRET_KEY = '7uYwu0XmXSyQDpKJBQLJBqq6'; // Test Credentials

// RAZORPAY_ENVIRONMENT PROD
// const RZP_API_KEY = 'rzp_live_rtD9f5lNZHVgce'; // Live Credentials
// const RZP_SECRET_KEY = 'd9z1VRdplqAzUjWcydDKhHNu'; // Live Credentials


const API = {
    API_ENDPOINT,
    API_AFTERLOGIN_POINT,
    RZP_API_KEY,
    RZP_SECRET_KEY,
    TOKEN,
    API_IMAGE_WITH_HTTPS,
    API_IMAGE_WITHOUT_HTTPS
}

export default API;
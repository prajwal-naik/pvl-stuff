import "./styles/App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Home from "./containers/Home/Home.jsx";
import CourseDetails from "./containers/CourseDetails/CourseDetails.jsx";
import Category from "./containers/Category/Category.jsx";
import Search from "./containers/Search/Search.jsx";
import Trainer from "./containers/Trainer/Trainer.jsx";
import Franchise from "./containers/Franchise/Franchise.jsx";
import Quiz from "./containers/Quiz/Quiz.jsx";
import About from "./containers/About/About.jsx";
import Contact from "./containers/Contact/Contact.jsx";
import Register from "./containers/Register/Register.jsx";
import PayNow from "./containers/PayNow/PayNow.jsx";
import Account from "./containers/Account/Account.jsx";
import SignIn from "./containers/Signin/Signin.jsx";
import MobileNumber from "./containers/MobileNumber/MobileNumber.jsx";
import Otp from "./containers/Otp/Otp.jsx";
import Video from "./containers/Video/Video.jsx";
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword";
import SignUp from "./containers/Signup/Signup.jsx";
import TrainerDetails from "./containers/TrainerDetails/TrainerDetails.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/details/:slug" component={CourseDetails} />
        <Route path="/category" component={Category} />
        <Route path="/search/:title" component={Search} />
        <Route path="/trainer" component={Trainer} />
        <Route path="/video" component={Video} />
        <Route path="/trainer-details" component={TrainerDetails} />
        <Route path="/franchise" component={Franchise} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/about-us" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/account-profile-setting" component={Account} />
        <Route path="/register/:slug" component={Register} />
        <Route path="/pay" component={PayNow} />
        <Route path="/signin" component={SignIn} />
        <Route path="/mobile-number" component={MobileNumber} />
        <Route path="/otp" component={Otp} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/signup" component={SignUp} />
      </Router>
      <a href="#top" className="back-to-top">
        <i className="lni-chevron-up"></i>
      </a>
      <div id="preloader">
        <div className="loader" id="loader-1"></div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;

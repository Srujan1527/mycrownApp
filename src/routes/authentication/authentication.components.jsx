import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";
import "./authentication.style.scss";
import SignIn from "../../components/sign-in-form/sign-in-form.component.jsx";
import Signup from "../../components/sign-up-form/sign-up-form.component.jsx";
const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignIn />
      <Signup />
    </div>
  );
};

export default Authentication;

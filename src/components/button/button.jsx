/*
basically we have three buttons 
1) default 
2) inverted 
3) google sign-in 

how can we apply classes using this button component is with the help of classes right So lets create an object of button types like below that contain class Names 
*/
import "./button.styles.scss";
const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;

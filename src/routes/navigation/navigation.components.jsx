import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; //this hook allows us to interact froma a component with the Redux Store that means it helps to extract the data from the redux and pass it to components
import { Fragment, useContext } from "react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assests/crown.svg";
import "./navigation.styles.scss";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { CartContext } from "../../context/cart.context";
const Navigation = () => {
  //useSelector is a hook that you pass a selector function and a selector function is something that essentially extracts off the values that you want from the entire redux store
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);
  const { isCartOpen, setisCartOpen } = useContext(CartContext);
  const signOutHandler = async () => {
    await signOutUser();
    // setCurrentUser(null);
  };
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SignOut
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SignIn
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

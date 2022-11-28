import Home from "./routes/home/home.components";
import Navigation from "./routes/navigation/navigation.components";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import Authentication from "./routes/authentication/authentication.components";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";
const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user)); // now here we are just creating a object we need to dispatch the action so we use new hook called useDispatch
    });

    return unsubscribe;
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
      <Route path="checkout" element={<Checkout />} />
    </Routes>
  );
};

export default App;

// React & libraries imports
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
//Utils imports
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
//Reducer Actions
import { setCurrentUser } from "./store/user/user.action";
//Component imports
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import AuthenticationPage from "./routes/authentication/authentication.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<AuthenticationPage />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;

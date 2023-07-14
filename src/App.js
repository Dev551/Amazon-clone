import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe(
  "pk_test_51NRCsaSHDfdRTEQWylUvpuo8uxY2kT4l26IwGZebPfWWkTn7a9lqzqj5FjMrNTjM1PuMgOeGXMAScOJcr361lFda00eshYxDec"
);

const App = () => {
  const [{}, dispatch] = useStateValue();
  const auth = getAuth();

  useEffect(() => {
    // will only run once when the app component load...

    onAuthStateChanged(auth, (authUser) => {
      console.log("The user is >>>>", authUser);

      if (authUser) {
        // The use just logged in / the user was logged in
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = authUser.uid;
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        // ...
      } else {
        // User is signed out
        // ...
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          ></Route>
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          ></Route>
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          ></Route>
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
// calcirol sachet
// nuerobion forte

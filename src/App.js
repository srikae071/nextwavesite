// import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter as Route, Routes } from "react-router-dom";
// import { Switch, Route } from "react-router-dom";
// import { Redirect } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
// import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

const App = () => (
  <Routes>
    <Route exact path="/login" element={LoginForm} />
    <Route exact path="/" element={Home} />
    <Route exact path="/products" element={Products} />
    <Route exact path="/cart" element={Cart} />
    <Route path="/not-found" element={NotFound} />
    {/* <Navigate to="not-found" /> */}
  </Routes>
);

export default App;

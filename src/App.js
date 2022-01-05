import "./App.css";
import React, { useState, Fragment } from "react";
import Routers from "./Routers";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Header from "./components/layouts/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./components/layouts/Footer";
// import "leaflet/dist/leaflet.css";

function App() {
  return (
    <Router>
      <div>
        <Fragment>
          <Header />
        </Fragment>
        <Routers />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

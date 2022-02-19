import "./App.css";
import React, { useState, Fragment, useEffect } from "react";
import Routers from "./Routers";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Header from "./components/layouts/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./components/layouts/Footer";

import themplates from "./components/pages/shared/theme";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import { Box } from "@mui/system";
// import "leaflet/dist/leaflet.css";

const theme = createTheme(themplates);

function App() {
  useEffect(() => {}, []);
  return (
    <Router>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Box
            component="div"
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Header />
            <Box
              component="div"
              sx={{
                flexGrow: 1,
                overflow: "hidden",
                minHeight: "100%",
                pb: 4,
              }}
            >
              <Routers />
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </StyledEngineProvider>
    </Router>
  );
}

export default App;

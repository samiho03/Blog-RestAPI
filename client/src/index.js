import React from "react";
import ReactDOM from "react-dom/client"; // Import from "react-dom/client"
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";

// Create a root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
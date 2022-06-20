//import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom";
import * as React from "react";
import "./App.css";
import {
  Routes,
  Route,
  //Link
} from "react-router-dom";

import GlobalStyles from "@mui/material/GlobalStyles";

import Intro from "./Intro";
import System from "./System";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#FB8C00',
      contrastText: '#fff'
    },
    secondary: {
      main: '#FFCD38',
      contrastText: '#000'
    },
  },
  typography: {
    allVariants: {
      fontFamily: [
        '"Noto Sans TC"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          {/* <span> token: { localStorage.getItem('id_token') } </span> */}
          <GlobalStyles
            styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
          />
          <Routes>
            <Route path="/*" element={<Intro />} />
            <Route element={<ProtectedRoute/>} >
              <Route path="sys/*" element={<System />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

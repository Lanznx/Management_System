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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <span> token: { localStorage.getItem('id_token') } </span>
        <GlobalStyles
          styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
        />
        <Routes>
          <Route path="/*" element={<Intro />} />
          <Route element={<ProtectedRoute/>} >
            <Route path="sys/*" element={<System />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

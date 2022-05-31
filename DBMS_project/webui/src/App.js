//import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom";
import * as React from "react";
import "./App.css";
import {
  Routes,
  Route,
  //Link
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";

import GlobalStyles from "@mui/material/GlobalStyles";

import Intro from "./Pages/Intro";
import System from "./Pages/System";
import ProtectedRoute from "./Routes/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <GlobalStyles
            styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
          />
          <Routes>
            <Route path="/*" element={<Intro />} />
            <Route element={<ProtectedRoute />} >
              <Route path="sys/*" element={<System />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

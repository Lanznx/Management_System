//import logo from './logo.svg';
import * as React from "react";
import './App.css';

import GlobalStyles from '@mui/material/GlobalStyles';

import Intro from './Intro'

function App() {
  return (
    <div className="App">
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <Intro />
    </div>
  );
}

export default App;

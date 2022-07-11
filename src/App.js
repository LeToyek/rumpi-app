import React from "react";
import LoginPage from "./pages/LoginPage";
import './style.scss'
require('dotenv').config();
function App() {
  console.log(process.env)
  return (
    <div className="App">
      <LoginPage/>
    </div>
  );
}

export default App;

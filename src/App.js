import React from "react";
import { AppContextProvider } from "./context/AppContext";
import LoginPage from "./pages/AuthPage";
import "./style.scss";
function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <LoginPage />
      </AppContextProvider>
    </div>
  ); 
}

export default App;

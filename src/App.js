import React from "react";
import { AppContextProvider } from "./context/AppContext";
import LoginPage from "./pages/AuthPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./style.scss";
import ChatPage from "./pages/ChatPage";
import Homepage from "./pages/Homepage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <AppContextProvider>
            <Route exact path="/">
              <Homepage/>
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/chat">
              <ChatPage />
            </Route>
          </AppContextProvider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

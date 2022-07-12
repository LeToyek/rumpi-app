import React from "react";
import { AppContextProvider } from "./context/AppContext";
import LoginPage from "./pages/AuthPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./style.scss";
import ChatPage from "./pages/ChatPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <AppContextProvider>
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

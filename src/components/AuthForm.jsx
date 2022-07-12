import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const AuthForm = ({ isLogin }) => {
  const [LoginStatus, setLoginStatus] = useState(isLogin);
  const [isVisible, setIsVisible] = useState(false);
  const {
    Username,
    setUsername,
    Password,
    setPassword,
    onHandleLogin,
    onHandleRegister,
    isWrong,
  } = useAppContext();

  return (
    <form
      onSubmit={(e) => (LoginStatus ? onHandleLogin(e) : onHandleRegister(e))}
    >
      <label>Username</label>
      <input
        type="text"
        value={Username}
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Password</label>
      <div className="group-form">
        <input
          type= {isVisible? "text" : "passowrd"}
          value={Password}
          placeholder= "password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </button>
      </div>

      {isWrong ? <h6 className="text-wrong">wrong email or password</h6> : null}
      <h6 className="text-link" onClick={() => setLoginStatus(!LoginStatus)}>
        {LoginStatus
          ? "Haven't an account yet ? Register Here"
          : "Already have account ? Login here"}{" "}
      </h6>
      <button>{LoginStatus ? "Login" : "Register"}</button>
    </form>
  );
};

export default AuthForm;

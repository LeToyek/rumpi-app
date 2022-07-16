import { Snackbar } from "@mui/material";
import React from "react";
import AuthForm from "../components/AuthForm";
import LoadingSection from "../components/LoadingSection";
import { useAppContext } from "../context/AppContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";

const LoginPage = () => {
  const { isLoading, isOpenSnackBar, err,LoginStatus } = useAppContext();
  return isLoading ? (
    <LoadingSection />
  ) : (
    <div className="login-page">
      {LoginStatus? null :<Snackbar
        open={isOpenSnackBar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        
        <div className="c-snackbar" style={{backgroundColor: err === null ? "#4BB543":"#FF3333"}}>
          {err === null ? (
            <CheckCircleOutlineIcon />
          ) : (
            <DoNotDisturbAltIcon />
          )}
          {err === null ? (
            <h3>Login Success Success</h3>
          ) : (
            <h3>Wrong Password or Username</h3>
          )}
        </div>
      </Snackbar>}
      <AuthForm isLogin={false} />
    </div>
  );
};

export default LoginPage;

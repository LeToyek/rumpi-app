import { createClient } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [isWrong, setIsWrong] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const supabase = createClient(
    "https://utybkjndivaewaatsisa.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0eWJram5kaXZhZXdhYXRzaXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc1MTE2NjcsImV4cCI6MTk3MzA4NzY2N30.rx3pZlxCK8p1WQTy-zUiMNsUdKzVHwhltVRhzni38NE"
  );
  const postUserAccount = async () => {
    await supabase.from("Users").insert([{ Username, Password }]).single();
  };

  const getUserAccount = async () => {
    try {
      let data = await supabase
        .from("Users")
        .select(`Password`)
        .eq("Username", Username);
      if (data.body[0].Password === Password) {
        setIsWrong(false)
        console.log("login success");
      }else{
        setIsWrong(true)
      }
    } catch (error) {}
  };

  const onHandleLogin = (e) => {
    e.preventDefault();
    getUserAccount();
  };
  const onHandleRegister = (e) => {
    e.preventDefault();
    postUserAccount();
  };
  return (
    <AppContext.Provider
      value={{
        supabase,
        Username,
        setUsername,
        Password,
        setPassword,
        onHandleLogin,
        onHandleRegister,
        isWrong
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => useContext(AppContext);

export { AppContext, AppContextProvider, useAppContext };

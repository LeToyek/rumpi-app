import { createClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [userID,setUserID] = useState(null)
  const [isWrong, setIsWrong] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataMessages, setDataMessages] = useState(null);
  const history = useHistory();
  const supabase = createClient(
    "https://utybkjndivaewaatsisa.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0eWJram5kaXZhZXdhYXRzaXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc1MTE2NjcsImV4cCI6MTk3MzA4NzY2N30.rx3pZlxCK8p1WQTy-zUiMNsUdKzVHwhltVRhzni38NE"
  );
  const postUserAccount = async () => {
    await supabase.from("users").insert([{ Username, Password }]).single();
  };

  const getUserAccount = async () => {
    try {
      let data = await supabase
        .from("users")
        .select(`id,Password`)
        .eq("Username", Username);
      await setUserID(data.body[0].id)  
      if (data.body[0].Password === Password) {
        setIsWrong(false);
        console.log("login success");
        history.push("/chat");
      } else {
        setIsWrong(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  const getMessages = async () => {
    try {
      let data = await supabase
        .from("messages")
        .select(`created_at,time,users(Username)`);
      setDataMessages(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const sendMessage = async (message) => {
    try {
      await supabase
        .from("messages")
        .insert([{ text: message, user_id: userID }])
        .single();
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(()=>{
    console.log("matamu");
  })
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
        isWrong,
        sendMessage,
        dataMessages
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => useContext(AppContext);

export { AppContext, AppContextProvider, useAppContext };

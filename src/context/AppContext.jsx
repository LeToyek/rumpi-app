import { createClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [chatUsername, setChatUsername] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [chatRoomID, setChatRoomID] = useState("");
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataMessages, setDataMessages] = useState([]);
  const history = useHistory();
  const supabase = createClient(
    "https://utybkjndivaewaatsisa.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0eWJram5kaXZhZXdhYXRzaXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc1MTE2NjcsImV4cCI6MTk3MzA4NzY2N30.rx3pZlxCK8p1WQTy-zUiMNsUdKzVHwhltVRhzni38NE"
  );
  const postUserAccount = async () => {
    await supabase.from("users").insert([{ Username, Password }]).single();
  };
  const getUserById = async () => {
    try {
      const data = await supabase
        .from("users")
        .select("*")
        .eq("id", localStorage.getItem("user_id"));
      setUserData(data.body[0]);
    } catch (error) {}
  };
  const getUserAccount = async () => {
    try {
      let data = await supabase
        .from("users")
        .select(`*`)
        .eq("Username", Username);
      if (data.body[0].Password === Password) {
        setIsLoading(false);
        setIsWrong(false);
        setUserID(data.body[0].id);
        setUserData(data.body);
      } else {
        setIsWrong(true);
      }
    } catch (error) {
      setError(error);
    }
  };
  const getRoomData = async () => {
    try {
      const data = await supabase.from("rooms").select("*");
      setRooms(data.body);
    } catch (error) {
      setError(error);
    }
  };
  const createRoom = async (name) => {
    try {
      await supabase
        .from("rooms")
        .insert([{ name, user_id: localStorage.getItem("user_id") }]);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    if (userID) {
      localStorage.setItem("user_id", userID);
      history.push("/chat");
    }
  }, [userID, userData]);
  const getMessages = async (roomID) => {
    try {
      let data = await supabase
        .from("messages")
        .select(`*,users(Username)`)
        .eq("room_id", roomID);
      setDataMessages(data.body);
    } catch (error) {
      throw new Error(error);
    }
  };
  const deleteMessage = async (chatID) => {
    try {
      await supabase.from("messages").delete().match({ id: chatID });
    } catch (error) {
      setError(error);
    }
  };
  const editMessage = async (chatID, newMessage) => {
    const { data, error } = await supabase
      .from("messages")
      .update({ text: newMessage })
      .match({id: chatID});
    console.log(data);
    error && setError(error)  
  };
  const sendMessage = async (message, roomID) => {
    try {
      await supabase.from("messages").insert([
        {
          text: message,
          user_id: localStorage.getItem("user_id"),
          room_id: roomID,
        },
      ]);
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleRealtime = (payload) => {
    setDataMessages((current) => [...current, { ...payload.new }]);
    getMessages(payload.new.room_id);
    
  };
  const getRealTimeMessages = () => {
    const subscription = supabase
      .from("messages")
      .on("INSERT", (payload) => {
        handleRealtime(payload);
        console.log(payload)
      })
      .on("DELETE", payload => {
        // getMessages(payload.old.)
        console.log(payload);
      })
      .on("UPDATE", (payload) => {
        handleRealtime(payload);
      })
      .subscribe();
    return () => {
      supabase.removeSubscription(subscription);
    };
  };
  const getRealTimeRooms = () => {
    const subscription = supabase
      .from("rooms")
      .on("INSERT", (payload) => {
        setRooms((current) => [...current, payload.new]);
      })
      .subscribe();
    return () => {
      supabase.removeSubscription(subscription);
    };
  };

  const onHandleLogin = async (e) => {
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
        dataMessages,
        getMessages,
        getRealTimeMessages,
        setIsOpenModal,
        isOpenModal,
        chatRoomID,
        setChatRoomID,
        createRoom,
        getRoomData,
        rooms,
        getRealTimeRooms,
        userData,
        isLoading,
        getUserAccount,
        getUserById,
        deleteMessage,
        editMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => useContext(AppContext);

export { AppContext, AppContextProvider, useAppContext };

import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
const LoginForm = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const { supabase } = useAppContext();

  const postUserAccount = async () => {
    await supabase.from("Users").insert([{ Username, Password }]).single();
  };
  const getUserAccount = async () => {
    let data = await supabase
      .from("Users")
      .select(`Username,Password`)
      .single();
    data && console.log(data);
  };

  const onHandleLogin = (e) => {
    e.preventDefault();
    postUserAccount();
    getUserAccount();
  };
  return (
    <form onSubmit={(e) => onHandleLogin(e)}>
      <input
        type="text"
        value={Username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;

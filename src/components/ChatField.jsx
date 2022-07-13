import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useAppContext } from "../context/AppContext";

const ChatField = () => {
  const { sendMessage, getMessages, dataMessages } = useAppContext();
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("matamuu");
    getMessages();
  }, []);
  return (
    <div className="chat-field">
      <div className="chat-container">
        {!!dataMessages &&
          dataMessages.map((d) => {
            
            if (d.user_id === localStorage.getItem("user_id")) {
              return <ChatCard key={d.id} isUser={true} {...d}/>
            }
            
            return <ChatCard key={d.id} isUser={false} {...d}/>
          })}
      </div>
      <div className="group-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => sendMessage(text)}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};
const ChatCard = ({ isUser, text, time,users }) => {
  let username 
  if (users) username = users.Username
  return (
    <>
      {isUser ? (
        <div className="group-card user">
          <h5 className="chat-user">
            {username}
            <span>{time}</span>
          </h5>
          <div className="chat-card">
            <p>{text}</p>
          </div>
        </div>
      ) : (
        <div className="group-card">
          <h5 className="chat-user">
            {username}
            <span>{time}</span>
          </h5>
          <div className="chat-card">
            <p>{text}</p>
          </div>
        </div>
      )}
    </>
  );
};
export default ChatField;

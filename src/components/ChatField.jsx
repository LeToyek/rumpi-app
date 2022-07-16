import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useAppContext } from "../context/AppContext";
import callImg from "../assets/night-call.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
const ChatField = () => {
  const {
    sendMessage,
    getMessages,
    dataMessages,
    getRealTimeMessages,
    chatRoomID,
  } = useAppContext();
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [dataMessages]);
  useEffect(() => {
    getMessages(chatRoomID);
    getRealTimeMessages();
  }, [chatRoomID]);
  return chatRoomID.trim().length === 0 ? (
    <div className="chat-field">
      <img src={callImg} alt="zxzx" />
      <h2>Rumpi App</h2>
      <p>Connected with your friend by chatting </p>
    </div>
  ) : (
    <div className="chat-field">
      <div className="chat-container">
        {dataMessages &&
          dataMessages.map((d) => {
            if (d.user_id === localStorage.getItem("user_id")) {
              return <ChatCard key={d.id} isUser={true} {...d} />;
            }

            return <ChatCard key={d.id} isUser={false} {...d} />;
          })}
        <div ref={messagesEndRef} />
      </div>
      <form
        className="group-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim().length !== 0) {
            sendMessage(text, chatRoomID);
          }
          setText("");
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>
          <SendIcon />
        </button>
      </form>
    </div>
  );
};
const ChatCard = ({ isUser, text, time, users, id }) => {
  const [style, setStyle] = useState({ display: "none" });
  const [isShowOption, setIsShowOption] = useState(false);
  let username;
  if (users) username = users.Username;
  return (
    <>
      {isUser ? (
        <div className="group-card user">
          <h5 className="chat-user">
            {username}
            <span>{time}</span>
          </h5>

          <div
            className="chat-card"
            onMouseEnter={() => setStyle({ display: "block" })}
            onMouseLeave={() => setStyle({ display: "none" })}
          >
            {isShowOption ? (
              <Options closeMe={() => setIsShowOption(false)} chatID={id} />
            ) : null}
            <div
              className="more-icon"
              style={style}
              onClick={() => setIsShowOption(true)}
            >
              <MoreHorizIcon />
            </div>
            <p>{text}</p>
          </div>
        </div>
      ) : (
        <div className="group-card">
          <h5 className="chat-user">
            {username}
            <span>{time}</span>
          </h5>

          <div
            className="chat-card"
            onMouseEnter={() => setStyle({ display: "block" })}
            onMouseLeave={() => setStyle({ display: "none" })}
          >
            {isShowOption ? (
              <Options closeMe={() => setIsShowOption(false)} chatID={id} />
            ) : null}
            <div
              className="more-icon"
              style={style}
              onClick={() => setIsShowOption(true)}
            >
              <MoreHorizIcon />
            </div>
            <p>{text}</p>
          </div>
        </div>
      )}
    </>
  );
};
const Options = ({ closeMe, chatID }) => {
  const { deleteMessage } = useAppContext();
  return (
    <div className="options">
      <div className="wrapper" onClick={() => {
        deleteMessage(chatID)
        closeMe()
        }}>
        <DeleteIcon />
        <h4>Delete</h4>
      </div>
      <div className="wrapper">
        <EditIcon />
        <h4>Edit</h4>
      </div>
      <div className="wrapper" onClick={closeMe}>
        <ClearOutlinedIcon />
        <h4>Cancel</h4>
      </div>
    </div>
  );
};
export default ChatField;

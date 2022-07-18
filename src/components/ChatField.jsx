import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useAppContext } from "../context/AppContext";
import callImg from "../assets/night-call.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import empty from '../assets/empty-mail.png'
const ChatField = () => {
  const {
    sendMessage,
    getMessages,
    dataMessages,
    chatRoomID,
    isShowEditField,
    setIsShowEditField,
    chatID,
    editMessage
  } = useAppContext();
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [dataMessages]);
  useEffect(() => {
    getMessages(chatRoomID);
  }, [chatRoomID]);
  return chatRoomID.trim().length === 0 ? (
    <div className="chat-field">
      <img src={callImg} alt="zxzx" />
      <h2>Rumpi App</h2>
      <p>Connected with your friend by chatting </p>
    </div>
  ) : (
    <div className="chat-field">
      {isShowEditField ? (
        <div className="edit-field">
          <h2>Edit Message</h2>
          <input type="text" value={editText} onChange={e => setEditText(e.target.value)} autoFocus/>
          <div className="buttons">
            <button onClick={()=>{
              editMessage(chatID,editText)
              setEditText("")
              setIsShowEditField(false)
            }}>Edit</button>
            <button onClick={()=>setIsShowEditField(false)}>Cancel</button>
          </div>
        </div>
      ) : null}
      {/* {dataMessages.length === 0 ? <div className="empty-message">
        <img src={empty} alt="empty" />
        <h2>No Message</h2>
        <p>be the first one who say hello in this chat room </p>
      </div>: null} */}
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
  const { deleteMessage, setChatID, setIsShowEditField } = useAppContext();
  return (
    <div className="options">
      <div
        className="wrapper"
        onClick={() => {
          deleteMessage(chatID);
          closeMe();
        }}
      >
        <DeleteIcon />
        <h4>Delete</h4>
      </div>
      <div
        className="wrapper"
        onClick={() => {
          setIsShowEditField(true);
          setChatID(chatID)
          closeMe()
        }}
      >
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

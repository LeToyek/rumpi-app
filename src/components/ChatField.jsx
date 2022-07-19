import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useAppContext } from "../context/AppContext";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import empty from "../assets/empty-mail.png";
import StartChatField from "./StartChatField";
const ChatField = () => {
  const {
    sendMessage,
    getMessages,
    dataMessages,
    chatRoomID,
    isShowEditField,
    setIsShowEditField,
    chatID,
    editMessage,
    rooms,
    isShowRoom,
  } = useAppContext();
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [width, setWidth] = useState(window.innerWidth);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const roomData = rooms && rooms.filter((e) => e.id === chatRoomID);
  useEffect(() => {
    scrollToBottom();
  }, [dataMessages]);
  useEffect(() => {
    getMessages(chatRoomID);
  }, [chatRoomID]);
  return chatRoomID.trim().length === 0 ? (
    <StartChatField />
  ) : (
    <div className="chat-field">
      {isShowEditField ? (
        <div className="edit-field">
          <h2>Edit Message</h2>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <div className="buttons">
            <button
              onClick={() => {
                editMessage(chatID, editText);
                setEditText("");
                setIsShowEditField(false);
              }}
            >
              Edit
            </button>
            <button onClick={() => setIsShowEditField(false)}>Cancel</button>
          </div>
        </div>
      ) : null}

      <div className="room-name">
        <h2>🏚️ {roomData[0].name}</h2>
      </div>
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
            onClick={
              window.innerWidth < 500
                ? () => {
                    setIsShowOption(!isShowOption);
                  }
                : null
            }
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
            oncli
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
          setChatID(chatID);
          closeMe();
        }}
      >
        <EditIcon />
        <h4>Edit</h4>
      </div>

      <div className="wrapper" onClick={()=>{
        closeMe()
        }}>
        <ClearOutlinedIcon />
        <h4>Cancel</h4>
      </div>
    </div>
  );
};
export default ChatField;

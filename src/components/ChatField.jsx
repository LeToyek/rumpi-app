import React from "react";
import SendIcon from "@mui/icons-material/Send";

const ChatField = () => {
  return (
    <div className="chat-field">
      <div className="chat-container">
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </div>
      <div className="group-form">
        <input type="text" />
        <button>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};
const ChatCard = () => {
  return (
    <>
      <h5 className="chat-user">toyek 🥶<span>Today 6:34</span></h5>
      <div className="chat-card">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam nesciunt, deserunt consequatur provident, nihil similique ipsa necessitatibus cum natus non alias quae modi, voluptatibus quod dignissimos voluptates architecto libero totam!
        </p>
      </div>
    </>
  );
};

export default ChatField;

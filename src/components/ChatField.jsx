import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useAppContext } from "../context/AppContext";

const ChatField = () => {
  const {sendMessage} = useAppContext()
  const [text,setText] = useState("")
  return (
    <div className="chat-field">
      <div className="chat-container">
        <ChatCard isUser={true} />
        <ChatCard isUser={true} />
        <ChatCard isUser={false} />
        <ChatCard isUser={false} />
        <ChatCard isUser={true} />
      </div>
      <div className="group-form">
        <input type="text" value={text} onChange={e => setText(e.target.value)}/>
        <button onClick={()=> sendMessage(text)}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};
const ChatCard = ({ isUser }) => {
  return (
    <>
      {isUser ? (
        <div className="group-card user">
          <h5 className="chat-user">
            toyek 🥶<span>Today 6:34</span>
          </h5>
          <div className="chat-card">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam
              nesciunt, deserunt consequatur provident, nihil similique ipsa
              necessitatibus cum natus non alias quae modi, voluptatibus quod
              dignissimos voluptates architecto libero totam!
            </p>
          </div>
        </div>
      ) : (
        <div className="group-card">
          <h5 className="chat-user">
            toyek 🥶<span>Today 6:34</span>
          </h5>
          <div className="chat-card">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam
              nesciunt, deserunt consequatur provident, nihil similique ipsa
              necessitatibus cum natus non alias quae modi, voluptatibus quod
              dignissimos voluptates architecto libero totam!
            </p>
          </div>
        </div>
      )}
    </>
  );
};
export default ChatField;

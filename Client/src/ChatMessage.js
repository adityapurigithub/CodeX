import React from "react";
import bot from "./assets/bot.svg";
import userImg from "./assets/user.svg";

const ChatMessage = (chat) => {
  const { user, message } = chat.chat;
  return (
    <div>
      <div className={`chat-message ${user === "bot" && "Ai"}`}>
        <div className="chat-message-center">
          <div className={`avatar ${user === "bot" && "avatar-ai"}`}>
            {user === "bot" ? <img src={bot} /> : <img src={userImg} />}
          </div>
          <div className="message">{message}</div>
        </div>
      </div>
      {/* <div className="chat-message Ai">
        <div className="chat-message-center">
          <div className="avatar-ai">
            <img src={bot} />
          </div>
          <div className="message">{message}</div>
        </div>
      </div> */}
    </div>
  );
};

export default ChatMessage;

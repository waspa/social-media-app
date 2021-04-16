import React, { useCallBack } from "react";
import ChatBubble from "../../components/ChatBubble";

const ChatMessage = ({ message, user, friend }) => {
	return <ChatBubble message={message} user={user} friend={friend} />;
};

export default ChatMessage;

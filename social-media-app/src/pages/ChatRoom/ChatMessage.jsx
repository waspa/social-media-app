import React, { useCallBack } from "react";
import ChatBubble from "../../components/ChatBubble";

const ChatMessage = ({ message, user, friend }) => {
	let isRightBubble = true;
	if (user.id === message.postedBy) isRightBubble = false;

	return (
		<ChatBubble
			message={message}
			user={isRightBubble ? friend : user}
			isRightBubble={isRightBubble}
		/>
	);
};

export default ChatMessage;

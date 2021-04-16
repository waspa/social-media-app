import React, { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";

const ChatRoom = () => {
	const [isloading, setLoading] = useState(false);
	const [chatMessages, setMessage] = useState([]);

	useEffect(() => {}, []);

	return isloading ? (
		<span>Loading</span>
	) : chatMessages.length > 0 ? (
		<ul className="list-unstyled">
			{chatMessages.map((message) => (
				<ChatMessage message={message} />
			))}
		</ul>
	) : (
		<p>No results found</p>
	);
};

export default ChatRoom;

import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";

import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const ChatRoom = ({ id, user }) => {
	const [isloading, setLoading] = useState(false);
	const [chatMessages, setMessage] = useState([]);

	const { currentUserDetails } = useContext(AuthContext);
	const { chatRecipient, postChat, fetchAllChats } = useContext(ChatContext);

	const { fetchChats } = useContext(ChatContext);

	useEffect(() => {
		setLoading(true);

		let chatsRef = fetchChats(id);
		chatsRef.onSnapshot((doc) => {
			let chatsArray = [];
			let chats = doc && doc.data() && doc.data().messages;

			if (chats.length > 0)
				chats.map((chat) => {
					let chatObj = chat;
					chatsArray.push(chatObj);
				});

			setLoading(false);
			setMessage(chatsArray);
		});
	}, [id]);

	return (
		<>
			<h5>Recent chats with {user && user.fullName}</h5>
			<div className="chat-container">
				{isloading ? (
					<span>Loading</span>
				) : chatMessages.length > 0 ? (
					<div className="chat-bubble">
						<ul className="list-unstyled">
							{chatMessages.map((message) => (
								<ChatMessage
									message={message}
									user={currentUserDetails}
									friend={chatRecipient}
								/>
							))}
						</ul>
					</div>
				) : (
					<p>No chats found</p>
				)}
				<MessageInput
					roomId={id}
					currentUserDetails={currentUserDetails}
					chatRecipient={chatRecipient}
					postChat={postChat}
					fetchAllChats={fetchAllChats}
				/>
			</div>
		</>
	);
};

export default ChatRoom;

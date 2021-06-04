import React, { useState, useCallback, useContext } from "react";

const MessageInput = ({
	roomId,
	currentUserDetails,
	chatRecipient,
	postChat,
	fetchAllChats,
}) => {
	const [message, setMessage] = useState("");
	const [photoUrl, setPhotoUrl] = useState("");
	const [videoUrl, setVideoUrl] = useState("");

	const handleChange = useCallback((e) => {
		e.preventDefault();
		setMessage(e.target.value);
	}, []);

	const handleClick = useCallback(async () => {
		await postChat(message, photoUrl, videoUrl, roomId);
		setMessage("");
	}, [message]);

	return (
		<div className="message-input">
			<input
				value={message}
				className="chat-input"
				onChange={handleChange}
			/>
			<button className="post-btn" onClick={handleClick}>
				Enter
			</button>
		</div>
	);
};

export default MessageInput;

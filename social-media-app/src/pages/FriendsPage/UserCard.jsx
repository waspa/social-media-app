import React, { useCallBack, useContext } from "react";
import { Media } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { BsFillPersonFill, BsFillChatFill } from "react-icons/bs";

import { ChatContext } from "../../context/ChatContext";

const UserCard = ({ user, handleClick }) => {
	const history = useHistory();
	const {
		createPrivateRoom,
		fetchAllUsers,
		getChatRoomId,
		setFriendDetails,
	} = useContext(ChatContext);

	return (
		<Media
			as="li"
			onClick={async () => {
				const roomId = await getChatRoomId(user.id);
				setFriendDetails(user);
				// history.push(`/chat-room/${roomId}`);
				handleClick(roomId, user);
				// const roomCreated = await createPrivateRoom(user.id);
				// console.log("roomCreated ", roomCreated);
				// const users = await fetchAllUsers();
			}}
		>
			<BsFillPersonFill style={{ width: "80px", height: "60px" }} />
			<Media.Body>
				<h5>{user && user.fullName}</h5>
				<p>{(user && user.lastMessage) || "test message"}</p>
			</Media.Body>
			<BsFillChatFill
				style={{
					width: "30px",
					height: "30px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			/>
		</Media>
	);
};

export default UserCard;

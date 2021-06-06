import React, { useCallBack, useContext, useState } from "react";
import { Media, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { BsFillPersonFill, BsFillChatFill } from "react-icons/bs";

import { ChatContext } from "../../context/ChatContext";

const UserCard = ({ user }) => {
	const [requestSent, setRequestSent] = useState(false);
	const history = useHistory();
	const {
		createPrivateRoom,
		fetchAllUsers,
		getChatRoomId,
		sendFriendRequest,
	} = useContext(ChatContext);

	return (
		<Media as="li">
			<BsFillPersonFill style={{ width: "80px", height: "60px" }} />
			<Media.Body>
				<h6>{user && user.fullName}</h6>
			</Media.Body>
			<Button
				variant={requestSent ? "success" : "primary"}
				onClick={async () => {
					if (user && user.id) {
						if (!requestSent) {
							sendFriendRequest(user.id);
							setRequestSent(true);
						}
					} else {
						console.log("No user id found for user ", user);
					}
				}}
			>
				{requestSent ? "Sent Request" : "Follow"}
			</Button>
		</Media>
	);
};

export default UserCard;

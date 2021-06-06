import React, { useCallBack, useContext, useState } from "react";
import { Media, Button } from "react-bootstrap";
import { BsFillPersonFill, BsFillChatFill } from "react-icons/bs";

import { ChatContext } from "../../context/ChatContext";

const RequestCard = ({ request }) => {
	const { acceptFriendRequest, declineFriendRequest } = useContext(
		ChatContext
	);

	return (
		<Media as="li">
			<BsFillPersonFill style={{ width: "80px", height: "60px" }} />
			<Media.Body>
				<h5>
					{request && request.details && request.details.fullName}
				</h5>
			</Media.Body>
			<Button
				variant="danger"
				onClick={async () => {
					declineFriendRequest(request.userId, request.requestId);
				}}
			>
				Decline
			</Button>
			<Button
				variant="success"
				onClick={async () => {
					acceptFriendRequest(request.userId, request.requestId);
				}}
			>
				Accept
			</Button>
		</Media>
	);
};

export default RequestCard;

import React from "react";
import { Media } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import moment from "moment";

const ChatBubble = ({ user, message, isRightBubble }) => {
	return (
		<Media className={isRightBubble ? "media-left" : "media-right"}>
			{isRightBubble ? (
				<BsFillPersonFill style={{ width: "80px", height: "60px" }} />
			) : null}
			<Media.Body>
				{message.text ? <p>{message.text}</p> : null}
				{message.createdAt ? (
					<p>
						Posted at: {message.createdAt.toDate().toDateString()}
					</p>
				) : null}
			</Media.Body>
			{!isRightBubble ? (
				<BsFillPersonFill style={{ width: "80px", height: "60px" }} />
			) : null}
		</Media>
	);
};

export default ChatBubble;

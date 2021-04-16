import React from "react";
import { Media } from "react-bootstrap";

const ChatBubble = ({ user, message, isRightBubble, isLeftBubble }) => {
	return (
		<Media>
			{isRightBubble ? (
				<img
					width={64}
					height={64}
					className="ml-3"
					src="holder.js/64x64"
					alt="Generic placeholder"
				/>
			) : null}
			<Media.Body>
				<p>
					Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
					scelerisque ante sollicitudin commodo. Cras purus odio,
					vestibulum in vulputate at, tempus viverra turpis. Fusce
					condimentum nunc ac nisi vulputate fringilla. Donec lacinia
					congue felis in faucibus.
				</p>
			</Media.Body>
			{isLeftBubble ? (
				<img
					width={64}
					height={64}
					className="ml-3"
					src="holder.js/64x64"
					alt="Generic placeholder"
				/>
			) : null}
		</Media>
	);
};

export default ChatBubble;

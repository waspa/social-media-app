import React, { useCallBack } from "react";
import { Media } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const UserCard = ({ user }) => {
	return (
		<Media as="li">
			<img
				width={64}
				height={64}
				className="mr-3"
				src="holder.js/64x64"
				alt="Generic placeholder"
			/>
			<Media.Body>
				<h5>List-based media object</h5>
				<p>
					Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
					scelerisque ante sollicitudin commodo. Cras purus odio,
				</p>
			</Media.Body>
		</Media>
	);
};

export default UserCard;

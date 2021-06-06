import React, { useState, useEffect, useCallback, useContext } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Layout from "../../components/Layout";
import UserCard from "./UserCard";
import ChatRoom from "../ChatRoom";

import { ChatContext } from "../../context/ChatContext";
import { db, FieldValue } from "../../lib/Firebase";

import "../../styles/friendspage.css";

const FriendsPage = () => {
	const [isloading, setLoading] = useState(true);
	const [friends, setFriends] = useState([]);
	const [roomId, setRoomId] = useState(null);
	const [selectedUser, selectUser] = useState(null);
	const [errors, setErrors] = useState(false);

	const { fetchFriends, fetchLastChatMessage } = useContext(ChatContext);

	const handleClick = useCallback((id, user) => {
		setRoomId(id);
		selectUser(user);
	}, []);

	useEffect(() => {
		setLoading(true);
		fetchFriends()
			.then(async (users) => {
				let usersArray = [];
				await Promise.all(
					users.map(async (user) => {
						let userObj = user.data();
						const lastMessage = await fetchLastChatMessage(user.id);
						userObj.id = user.id;
						userObj.lastMessage = lastMessage;
						usersArray.push(userObj);
					})
				);
				setLoading(false);
				setFriends(usersArray);
			})
			.catch((errors) => console.log("errors occured  ", errors));
	}, []);

	console.log("fiends ====> ", friends);

	return (
		<Layout>
			<Container style={{ minHeight: "100vh", marginTop: "25px" }}>
				<div className="friends-page">
					<Row>
						<Col span={4}>
							<>
								<h6>Friends List</h6>
								<div className="friends-list">
									{isloading ? (
										"Loading ..."
									) : friends.length > 0 ? (
										<ul className="list-unstyled">
											{friends.map((friend) => (
												<UserCard
													key={friend.userId}
													user={friend}
													handleClick={(
														roomId,
														user
													) =>
														handleClick(
															roomId,
															user
														)
													}
												/>
											))}
										</ul>
									) : (
										<p>No results found</p>
									)}
								</div>
							</>
						</Col>
						<Col span={8}>
							{roomId ? (
								<ChatRoom id={roomId} user={selectedUser} />
							) : null}
						</Col>
					</Row>
				</div>
			</Container>
		</Layout>
	);
};

export default React.memo(FriendsPage);

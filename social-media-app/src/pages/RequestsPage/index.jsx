import React, { useState, useEffect, useCallback, useContext } from "react";
import UserCard from "./UserCard";
import RequestsContainer from "./RequestsContainer";
import Layout from "../../components/Layout";

import { Container } from "react-bootstrap";

import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { db, FieldValue } from "../../lib/Firebase";

import "../../styles/friendspage.css";

const UsersPage = () => {
	const [isloading, setLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const [errors, setErrors] = useState(false);

	const { fetchUsers, getRequestRoomId } = useContext(ChatContext);
	const { currentUserId } = useContext(AuthContext);

	useEffect(() => {
		setLoading(true);

		getRequestRoomId();

		let usersRef = fetchUsers();
		usersRef.onSnapshot((doc) => {
			let usersArray = [];
			let users = doc && doc.docs && doc.docs;

			if (users.length > 0)
				users
					.filter((user) => user.id !== currentUserId)
					.map((user) => {
						let userObj = user.data();
						userObj.id = user.id;
						usersArray.push(userObj);
					});

			setLoading(false);
			setUsers(usersArray);
		});
	}, []);

	console.log("users ====> ", users);

	return (
		<Layout>
			<Container
				style={{
					minHeight: "100vh",
					maxWidth: "500px",
					marginTop: "90px",
				}}
			>
				<RequestsContainer />
				<h6>Suggested Friends</h6>
				{isloading ? (
					"Loading ..."
				) : users.length > 0 ? (
					<ul className="list-unstyled">
						{users
							.filter((user) => user && user.fullName)
							.map((user) => (
								<UserCard key={user.userId} user={user} />
							))}
					</ul>
				) : (
					<p>No results found</p>
				)}
			</Container>
		</Layout>
	);
};

export default React.memo(UsersPage);

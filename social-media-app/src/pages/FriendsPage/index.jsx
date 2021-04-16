import React, { useState, useEffect, useCallback, useContext } from "react";
import UserCard from "./UserCard";

import { ChatContext } from "../../context/ChatContext";
import { db, FieldValue } from "../../lib/Firebase";

const FriendsPage = () => {
	const [isloading, setLoading] = useState(true);
	const [friends, setFriends] = useState(false);
	const [errors, setErrors] = useState(false);

	const { fetchFriends } = useContext(ChatContext);

	const handleClick = useCallback(() => {
		console.log("clicked");
	}, []);

	useEffect(() => {
		fetchFriends()
			.then((snapshot) =>
				snapshot.docs.map((d) => console.log("doc d is ", d.data()))
			)
			.catch((errors) => console.log("errors occured ", errors));
	}, []);

	return isloading ? (
		"Loading ..."
	) : friends.length > 0 ? (
		<ul className="list-unstyled">
			{friends.map((friend) => (
				<UserCard user={friend} handleClick={handleClick} />
			))}
		</ul>
	) : (
		<p>No results found</p>
	);
};

export default React.memo(FriendsPage);

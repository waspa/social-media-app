import React, { useState, useEffect, useCallback, useContext } from "react";
import RequestCard from "./RequestCard";

import { ChatContext } from "../../context/ChatContext";
import { db, FieldValue } from "../../lib/Firebase";

import "../../styles/friendspage.css";

const RequestsContainer = () => {
	const [isloading, setLoading] = useState(true);
	const [requests, setRequests] = useState([]);
	const [errors, setErrors] = useState(false);

	const { fetchUser, fetchRequests, getUserDetails } = useContext(
		ChatContext
	);

	useEffect(() => {
		setLoading(true);

		let requestsRef = fetchRequests();
		requestsRef.onSnapshot(async (doc) => {
			let requestsArray = [];
			let result = doc && doc.docs[0];

			let userIds = result && result.data() && result.data().requests;

			if (userIds.length > 0)
				await Promise.all(
					userIds.map(async (userId) => {
						let user = await getUserDetails(userId);
						let requestObj = {
							userId,
							details: user.data(),
							requestId: result.id,
						};

						requestsArray.push(requestObj);
					})
				);

			setLoading(false);
			setRequests(requestsArray);
		});
	}, []);

	console.log("requests ====> ", requests);

	return (
		<>
			{isloading ? (
				"Loading ..."
			) : requests.length > 0 ? (
				<>
					<h5>Friend Requests</h5>
					<ul className="list-unstyled">
						{requests
							.filter(
								(request) =>
									request &&
									request.details &&
									request.details.fullName
							)
							.map((request) => (
								<RequestCard
									key={request.requestId}
									request={request}
								/>
							))}
					</ul>
				</>
			) : null}
		</>
	);
};

export default React.memo(RequestsContainer);

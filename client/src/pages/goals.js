import React from "react";
import { Helmet } from "react-helmet";
import Axios from "axios";
import Bottom from "../sections/bottom"

export default class Goals extends React.Component {
	state = {
		goals: [],
		isLoading: true,
		errors: null,
	};

	getGoals() {
		Axios.get("/api/goals", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("access_token")}`,
			}
		})
			.then((response) => {
				this.setState({
					goals: response.data,
					isLoading: false,
				});
			})
			.catch((error) => this.setState({ error, isLoading: false }));
	}

	componentDidMount() {
		this.getGoals();
	}

	render() {
		const { isLoading, goals } = this.state;

		return (
			<>
			<div className="container">
			<Helmet>
				<title>Goals</title>
			</Helmet>
			{/* <h1>2021</h1> */}
			{/* <br /> */}
			<div className="tab-space">
				<ul>
					{!isLoading ? (
						goals.map((fields) => {
							const { _id, goal } = fields; // Getting the fields in a const as it is neater and more informative.
							return (
								<div key={_id}>
									<li>{goal}</li>
								</div>
							);
						})
					) : (
						<p>Loading...</p>
					)}
				</ul>
			</div>
		</div>
		
		{/* Page footer. */}
		<Bottom />
		</>
		)
	}
}

import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import md5 from "crypto-js/md5";
import sha1 from "crypto-js/sha1";
import Form from "react-bootstrap/Form";
import Bottom from "../sections/bottom";

class Hash extends Component {
	state = {
		userInput: "",
	};

	inputChangedHandler = (event) => {
		this.setState({ userInput: event.target.value });
	};

	render() {
		return (
			<>
			<div className="container">
			<Helmet>
				<title>Hash</title>
			</Helmet>
			<Container>
				<Form.Control
					as="textarea"
					rows="8"
					onChange={this.inputChangedHandler}
					value={this.state.userInput}
					className="textarea"
					placeholder="Enter the plain text here."
				/>

				{this.state.userInput.length > 0 && (
					<div className="hash">
					<br />
						MD5 - {md5(this.state.userInput).toString()}
						<br />
						SHA1 - {sha1(this.state.userInput).toString()}
					</div>
				)}
			</Container>
		</div>
		
		{/* Page footer. */}
		<Bottom />
		</>
		)
	}
}
export default Hash;

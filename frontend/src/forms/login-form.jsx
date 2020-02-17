import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const formRegisterStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'center',
};

export default function Login(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function onChangeEmail(e) {
		setEmail(e.target.value);
	}

	function onChangePassword(e) {
		setPassword(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		const user = {
			email: email,
			password: password,
		};

		console.log(user);

		//todo, check link of DB
		(async () => {
			try {
				const res = await axios.post('http://localhost:4000/auth/login/', user);
				console.log(res.data);
			} catch (err) {
				console.log(err);
			}
		})();

		//remove it
		window.location = '/';
	}

	return (
		<div>
			<h3 style={formRegisterStyle}>Login</h3>
			<div style={formRegisterStyle}>
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" value={email} onChange={onChangeEmail} placeholder="Enter email" />
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" value={password} onChange={onChangePassword} placeholder="Password" />
					</Form.Group>
					<Form.Group controlId="formBasicCheckbox">
						<Form.Check type="checkbox" label="Check me out" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</div>
		</div>
	);
}

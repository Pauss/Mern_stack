import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const formRegisterStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'center',
};

//a@a.a

export default function Register(props) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function onChangeUsername(e) {
		setUsername(e.target.value);
	}

	function onChangeEmail(e) {
		setEmail(e.target.value);
	}

	function onChangePassword(e) {
		setPassword(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		const user = {
			username: username,
			email: email,
			password: password,
		};

		console.log(user);

		//todo, check link of DB
		(async () => {
			try {
				const res = await axios.post('http://localhost:4000/auth/register/', user);
				console.log(res.data);
			} catch (err) {
				console.log(err);
			}
		})();

		//remove it
		window.location = '/singin';
	}

	return (
		<div>
			<h3 style={formRegisterStyle}>Register</h3>

			<div style={formRegisterStyle}>
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" value={username} onChange={onChangeUsername} placeholder="Enter username" />
					</Form.Group>

					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" value={email} onChange={onChangeEmail} placeholder="Enter email" />
						<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
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

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { SessionContext } from '../utils/session';
import { useContext } from 'react';

const formRegisterStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'center',
};

export default function Login(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { setIsLogged } = useContext(SessionContext);
	let history = useHistory();

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
				await axios.post('http://localhost:4001/auth/login/', user, { withCredentials: true });
				setIsLogged(true);
				history.push('/');
			} catch (err) {
				console.log(err);
			}
		})();
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

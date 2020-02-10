import React, { useState } from 'react';
import axios from 'axios';

export default function CreateUsers(props) {
	const [username, setUsername] = useState('');

	function onChangeUsername(e) {
		setUsername(e.target.value);
	}

	function onSubmit(e) {
		e.preventDefault();

		const user = {
			username: username,
		};

		console.log(user);

		(async () => {
			try {
				const res = await axios.post('http://localhost:4000/users/add', user);
				console.log(res.data);
			} catch (err) {
				console.log(err);
			}
		})();

		setUsername('');
	}

	return (
		<div>
			<h3>Create New User</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Username: </label>
					<input type="text" required className="form-control" value={username} onChange={onChangeUsername} />
				</div>
				<div className="from-group">
					<input type="submit" value="Create User" className="btn btn-primary" />
				</div>
			</form>
		</div>
	);
}

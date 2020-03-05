import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default function CreateExercises(props) {
	const [username, setUsername] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState(0);
	const [date, setDate] = useState(new Date());
	const [users, setUsers] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get('http://localhost:4001/users/', { withCredentials: true });
				if (res.data.length > 0) {
					setUsers(res.data.map((user) => user.username));
					setUsername(res.data[0].username);
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	function onChangeUsername(e) {
		setUsername(e.target.value);
	}
	function onChangeDescription(e) {
		setDescription(e.target.value);
	}
	function onChangeDuration(e) {
		setDuration(e.target.value);
	}
	function onChangeDate(date) {
		setDate(date);
	}

	function onSubmit(e) {
		e.preventDefault();

		const exercise = {
			username: username,
			description: description,
			duration: duration,
			date: date,
		};

		console.log(exercise);

		(async () => {
			try {
				await axios.post('http://localhost:4001/exercises/add/', exercise, { withCredentials: true });
			} catch (err) {
				console.log(err);
			}
		})();

		window.location = '/exercises';
	}

	return (
		<div>
			<h3>Create New Exercise Log</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Username: </label>
					<select className="browser-default form-control" required value={username} onChange={onChangeUsername}>
						{users.map((user) => {
							return (
								<option key={user} value={user}>
									{user}
								</option>
							);
						})}
					</select>
				</div>
				<div className="form-group">
					<label>Description: </label>
					<input type="text" required className="form-control" value={description} onChange={onChangeDescription} />
				</div>

				<div className="form-group">
					<label>Duration (in minutes): </label>
					<input type="text" required className="form-control" value={duration} onChange={onChangeDuration} />
				</div>

				<div className="form-group">
					<label>Date: </label>
					<div>
						<DatePicker selected={date} onChange={onChangeDate} />
					</div>
				</div>

				<div className="form-group">
					<input type="submit" value="Create Exercise Log" className="btn btn-primary" />
				</div>
			</form>
		</div>
	);
}

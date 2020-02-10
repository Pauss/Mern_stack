import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default function EditExercises(props) {
	const [username, setUsername] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState(0);
	const [date, setDate] = useState(new Date());
	const [users, setUsers] = useState([]);

	useEffect(() => {
		// code to run on component mount

		(async () => {
			try {
				const res = await axios.get('http://localhost:4000/exercises/' + props.match.params.id);
				setUsername(res.data.username);
				setDescription(res.data.description);
				setDuration(res.data.duration);
				setDate(new Date(res.data.date));
			} catch (err) {
				console.log(err);
			}
		})();

		(async () => {
			try {
				const res = await axios.get('http://localhost:4000/users/');
				if (res.data.length > 0) {
					setUsers(res.data.map((user) => user.username));
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
				const res = await axios.put('http://localhost:4000/exercises/update/' + props.match.params.id, exercise);
				console.log(res.data);
			} catch (err) {
				console.log(err);
			}
		})();

		window.location = '/';
	}

	return (
		<div>
			<h3>Edit Exercise Log</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Username: </label>
					<select
						className="browser-default form-control"
						// ref="userInput"
						//todo
						required
						value={username}
						onChange={onChangeUsername}>
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
					<input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
				</div>
			</form>
		</div>
	);
}

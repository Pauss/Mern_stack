import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CreateExercises(props) {
	const [username, setUsername] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState(0);
	const [date, setDate] = useState(new Date());
	const [users, setUsers] = useState([]);

	useEffect(() => {
		// code to run on component mount
		setUsers(['test user']);
		setUsername('test user');
	}, []);

	function onChangeUsername(e) {
		setUsername(e);
	}
	function onChangeDescription(e) {
		setDescription(e);
	}
	function onChangeDuration(e) {
		setDuration(e);
	}
	function onChangeDate(e) {
		setDate(e);
	}
	function onChangeUsers(e) {
		setUsers(e);
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

		window.location = '/';
	}

	return (
		<div>
			<h3>Create New Exercise Log</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Username: </label>
					{/* <select ref="userInput" required className="form-control" value={username} onChange={onChangeUsername}>
						{users.map((user) => {
							return (
								<option key={user} value={user}>
									{user}
								</option>
							);
						})}
					</select> */}
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

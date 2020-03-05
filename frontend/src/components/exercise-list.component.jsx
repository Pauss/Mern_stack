import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = (props) => {
	return (
		<tr>
			<td>{props.exercise.username}</td>
			<td>{props.exercise.description}</td>
			<td>{props.exercise.duration}</td>
			<td>{props.exercise.date.substring(0, 10)}</td>
			<td>
				<Link to={'/edit/' + props.exercise._id}>edit</Link> |{' '}
				<a
					href="#"
					onClick={() => {
						props.deleteExercise(props.exercise._id);
					}}>
					{' '}
					delete
				</a>
			</td>
		</tr>
	);
};

export default function ExercisesList(props) {
	const [exercises, setExercises] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get('http://localhost:4001/exercises/', { withCredentials: true });
				setExercises(res.data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	async function deleteExercise(id) {
		try {
			axios.delete('http://localhost:4001/exercises/' + id);
			setExercises(exercises.filter((el) => el._id !== id));
		} catch (err) {
			console.log(err);
		}
	}

	function ExercisesList() {
		return exercises.map((currentexercise) => {
			return <Exercise key={currentexercise._id} exercise={currentexercise} deleteExercise={deleteExercise} />;
		});
	}

	return (
		<div>
			<h3>Logged exercises</h3>
			<table className="table">
				<thead className="thead-light">
					<tr>
						<th>Username</th>
						<th>Description</th>
						<th>Duration</th>
						<th>Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>{ExercisesList()}</tbody>
			</table>
		</div>
	);
}

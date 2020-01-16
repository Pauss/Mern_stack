import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
	return (
		<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
			<link to="/" className="navbar-brand">
				ExcerciseTracker
			</link>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav mr-auto">
					<li className="navbar-item">
						<Link to="/" className="nav-link">
							Exercises
						</Link>
					</li>
					<li className="navbar-item">
						<Link to="/create" className="nav-link">
							Create Exercises Log
						</Link>
					</li>
					<li className="navbar-item">
						<Link to="/user" className="nav-link">
							Create User
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

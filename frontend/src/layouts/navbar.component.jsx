import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
	return (
		<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
			<Link to="/" className="navbar-brand">
				ExcerciseTracker
			</Link>
			<div className=" navbar-collapse">
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
					<li className="navbar-item justify-content-end">
						<Link to="/singin" className="nav-link">
							SingIn
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

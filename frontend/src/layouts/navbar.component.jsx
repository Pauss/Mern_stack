import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SessionContext } from '../utils/session';

const links_logged = [
	{ name: 'Exercises', path: '/exercises' },
	{ name: 'Create Exercises Log', path: '/create' },
	{ name: 'Logout', path: '/logout' },
];

const links_notLogged = [{ name: 'Sign In', path: '/signin' }];

export default function Navbar(props) {
	const { isLogged } = useContext(SessionContext);

	const links = isLogged === true ? links_logged : links_notLogged;

	return (
		<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
			<Link to="/" className="navbar-brand">
				Excercise Tracker
			</Link>
			<div className=" navbar-collapse">
				<ul className="navbar-nav mr-auto">
					{links.map((link) => {
						return (
							<li key={link.name} className="navbar-item">
								<Link to={link.path} className="nav-link">
									{link.name}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}

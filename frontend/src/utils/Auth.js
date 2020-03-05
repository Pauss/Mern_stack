import React, { useContext } from 'react';
import { SessionCOntext, SessionContext } from './session';
import axios from 'axios';

export default function CheckAuth(props) {
	const [isLogged, setLogged] = useContext(SessionContext);

	async function check() {
		try {
			const res = await axios.get('http://localhost:4001/auth/isLogged/');
			if (res.isLogged === true) {
				setLogged(true);
			} else {
				setLogged(false);
			}
		} catch (err) {
			console.log(err);
		}
	}
}

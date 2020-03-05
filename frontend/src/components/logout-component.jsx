import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { SessionContext } from '../utils/session';

export default function Logout() {
	const history = useHistory();
	const [logged, setLogged] = useContext(SessionContext);

	(async () => {
		try {
			const res = await axios.get('http://localhost:4001/auth/logout/', { withCredentials: true });
			console.log(res.data);
			setLogged(false);
			history.push('/signin');
		} catch (err) {
			console.log(err);
		}
	})();

	return <div>Logging out!</div>;
}

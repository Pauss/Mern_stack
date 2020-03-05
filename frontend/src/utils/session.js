import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const SessionProvider = (props) => {
	const [isLogged, setIsLogged] = useState(getLogged);

	useEffect(() => {
		getLogged();
	}, []);

	async function getLogged() {
		try {
			const res = await axios.get('http://localhost:4001/auth/isLogged/', { withCredentials: true });
			console.log(res.data.isLogged);
			setIsLogged(res.data.isLogged);
		} catch (err) {
			console.log(err);
		}
	}

	return <SessionContext.Provider value={[isLogged, setIsLogged]}>{props.children}</SessionContext.Provider>;
};

export const SessionContext = createContext();

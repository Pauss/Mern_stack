import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { SessionContext } from '../utils/session';

export default function PrivateRoute({ component: Component, ...rest }) {
	const { isLogged } = useContext(SessionContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isLogged) {
					return <Component {...props} />;
				}
				return (
					<Redirect
						to={{
							pathname: '/signin',
							// state: {
							//   from: props.location
							// }
						}}
					/>
				);
			}}
		/>
	);
}

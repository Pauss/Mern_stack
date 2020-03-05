import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './layouts/navbar.component';
import Signin from './components/signin-component';
import Welcome from './components/welcome-component';
import Logout from './components/logout-component';
import { SessionProvider } from './utils/session';

function App() {
	return (
		<SessionProvider>
			<Router>
				<div className="container">
					<Navbar />
					<br />
					<Switch>
						<Route path="/" exact component={Welcome} />
						<Route path="/signin" component={Signin} />
						<Route path="/logout" component={Logout} />
					</Switch>
				</div>
			</Router>
		</SessionProvider>
	);
}

export default App;

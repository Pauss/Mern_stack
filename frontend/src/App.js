import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './layouts/navbar.component';
import Signin from './components/signin-component';
import Welcome from './components/welcome-component';
import Logout from './components/logout-component';
import ExercisesList from './components/exercise-list.component';
import EditExercise from './components/edit-exercise.component';
import CreateExercise from './components/create-exercise.component';
import CreateUser from './components/create-user.component';
import PrivateRoute from './components/privateRoute-component';
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
						<PrivateRoute path="/exercises" component={ExercisesList} />
						<PrivateRoute path="/edit/:id" component={EditExercise} />
						<PrivateRoute path="/create" component={CreateExercise} />
						<PrivateRoute path="/user" component={CreateUser} />
					</Switch>
				</div>
			</Router>
		</SessionProvider>
	);
}

export default App;

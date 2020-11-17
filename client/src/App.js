import React from 'react';
import { Container } from '@material-ui/core';
import Form from './components/Form';
import Users from './components/Users';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

function App() {
	return (
		<Container>
			<Switch>
				<Route exact path='/'>
					<Form url='login' />
				</Route>
				<Route exact path='/register'>
					<Form url='register' />
				</Route>
				<PrivateRoute path='/users' component={Users} />
			</Switch>
		</Container>
	);
}

export default App;

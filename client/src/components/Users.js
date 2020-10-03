import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import { Box, Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
});

export default function Users() {
	const classes = useStyles();
	const [users, setUsers] = useState([]);
	const history = useHistory();
	const getUsers = async () => {
		try {
			const response = await axiosWithAuth().get('/users');
			setUsers(response.data);
			// console.log(response, 'response');
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('authToken');
		history.push('/');
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<React.Fragment>
			<Box className={classes.container}>
				{users.map((user) => {
					return (
						<UserCard key={user.id} username={user.username} id={user.id} />
					);
				})}
				<Button
					onClick={handleLogout}
					variant='contained'
					className={classes.button}
				>
					Log Out
				</Button>
			</Box>
		</React.Fragment>
	);
}

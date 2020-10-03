import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import {
	Grid as Box,
	TextField,
	Button,
	makeStyles,
	Typography,
	CircularProgress,
} from '@material-ui/core';

const useStyles = makeStyles({
	container: {
		padding: '5%',
		width: '30%',
		background: 'white',
		borderRadius: '20px',
		transform: 'translateY(100%)',
		margin: '0 auto',
	},
	field: {
		margin: '20px auto',
	},
	signUpLink: {
		textAlign: 'center',
		display: 'block',
		textDecoration: 'none',
		fontSize: '20px',
		marginTop: '60px',
		backgroundColor: 'green',
		color: 'white',
		padding: '8px 0 8px 0',
		borderRadius: '4px',
	},
});

export default function Form(props) {
	const { handleSubmit, register, errors, formState } = useForm({
		mode: 'onChange',
	});
	const history = useHistory();
	const classes = useStyles();

	const onSubmit = (data) => {
		console.log(data);
		axios
			.post(`http://localhost:5000/api/auth/${props.url}`, data)
			.then((res) => {
				console.log(res);
				if (res.data.token) {
					localStorage.setItem('authToken', res.data.token);
				}
				history.push(props.url === 'login' ? '/users' : '/login');
			})
			.catch((err) => {
				console.error(err.message);
				alert(`Something Went Wrong! Please Try Again!`);
			});
	};

	if (formState.isSubmitting) {
		return (
			<Box className={classes.container}>
				<Typography>Loading...</Typography>
				<CircularProgress color='secondary' />
			</Box>
		);
	}

	return (
		<Box
			className={classes.container}
			component='form'
			onSubmit={handleSubmit(onSubmit)}
		>
			<TextField
				fullWidth={true}
				className={classes.field}
				autoFocus
				variant='outlined'
				type='text'
				id='username'
				name='username'
				inputRef={register({ required: 'Required' })}
				label='Username:'
				error={errors.username ? true : false}
				helperText={errors.username ? errors.username.message : null}
			/>

			<TextField
				fullWidth={true}
				className={classes.field}
				inputRef={register({
					required: 'Required',
				})}
				variant='outlined'
				type='password'
				id='password'
				name='password'
				label='Password:'
				error={errors.password ? true : false}
				helperText={errors.password ? errors.password.message : null}
			/>

			{props.url === 'register' ? (
				<TextField
					fullWidth={true}
					className={classes.field}
					inputRef={register({
						required: 'Required',
					})}
					variant='outlined'
					type='text'
					id='department'
					name='department'
					label='Department:'
					error={errors.department ? true : false}
					helperText={errors.department ? errors.department.message : null}
				/>
			) : null}

			<Button
				fullWidth
				variant='contained'
				color='primary'
				size='large'
				type='submit'
				disabled={!formState.isValid}
			>
				{props.url.toUpperCase()}
			</Button>

			{props.url === 'login' ? (
				<Link to='/register' className={classes.signUpLink}>
					Sign Up!
				</Link>
			) : null}
		</Box>
	);
}

import React from 'react';
import { makeStyles, Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		minWidth: '50%',
		margin: '20px',
		backgroundColor: 'gray',
		color: 'white',
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: '15px',
		color: 'white',
	},
});

export default function SimpleCard(props) {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color='textSecondary'
					gutterBottom
				>
					{props.id}
				</Typography>
				<Typography variant='h5' component='h2'>
					{props.username}
				</Typography>
				<Typography variant='h5' component='h2'>
					{props.department}
				</Typography>
			</CardContent>
		</Card>
	);
}

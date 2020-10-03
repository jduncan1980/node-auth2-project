import axios from 'axios';

const axiosWithAuth = () => {
	const token = localStorage.getItem('authToken');

	return axios.create({
		baseURL: 'http://localhost:5000/api',
		headers: {
			authorization: `Bearer ${token}`,
		},
	});
};

export default axiosWithAuth;

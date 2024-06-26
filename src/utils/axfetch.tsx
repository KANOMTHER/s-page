import axios from 'axios';

const axfetch = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

export default axfetch;

import axios from 'axios';

const axfetch = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default axfetch;

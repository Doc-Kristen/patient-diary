import axios from 'axios'

const BACKEND_URL = 'http://localhost:3000'
const REQUEST_TIMEOUT = 10000

const api = axios.create({
	withCredentials: true,
	baseURL: BACKEND_URL,
	timeout: REQUEST_TIMEOUT,
})

api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	config.headers['Content-Type'] = 'application/json'
	return config
})

export default api

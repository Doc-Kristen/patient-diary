import axios, { AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'react-toastify'

const BACKEND_URL = 'http://localhost:5000'
const REQUEST_TIMEOUT = 10000

const StatusCodeMapping: Record<number, boolean> = {
	[StatusCodes.BAD_REQUEST]: true,
	[StatusCodes.UNAUTHORIZED]: true,
	[StatusCodes.NOT_FOUND]: true,
}

const displayToastMessage = (message: string | string[]) => {
	if (Array.isArray(message)) {
		message.forEach(msg => toast.warn(msg))
	} else {
		toast.warn(message)
	}
}

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

api.interceptors.response.use(
	response => response,
	(error: AxiosError<{ message?: string | string[] }>) => {
		if (error.response) {
			const { status, data } = error.response
			if (StatusCodeMapping[status] && data && data.message) {
				displayToastMessage(data.message)
			} else {
				displayToastMessage('Произошла ошибка при запросе. Проверьте корректность введенных данных')
			}
		} else {
			displayToastMessage('Сервер недоступен. Пожалуйста, попробуйте позже.')
		}
		throw error
	},
)

export default api

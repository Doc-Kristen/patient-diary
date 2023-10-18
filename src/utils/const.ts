const BACKEND_URL = 'http://localhost:3000'

enum AppRoute {
	Main = '/',
	Patient = 'patient',
	Authorization = 'authorization',
	Doctor = 'doctor',
	NotFound = '*',
}

enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export { AppRoute, Status, BACKEND_URL }

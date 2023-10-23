const BACKEND_URL = 'http://localhost:3000'

enum AppRoute {
	Main = '/',
	Patient = 'patient/:id',
	Authorization = 'authorization',
	Doctor = 'doctor',
	NotFound = '*',
}

enum Status {
	PENDING = 'pending',
	SUCCESS = 'success',
	ERROR = 'error',
}

enum FormFields {
	SYSTOLIC = 'systolic',
	DIASTOLIC = 'diastolic',
	HEART_RATE = 'heartRate',
	COMPLAINTS = 'complaints',
	MEDICATIONS = 'medications',
	DATETIME = 'datetime',
}

export { AppRoute, Status, FormFields, BACKEND_URL }

enum AppRoute {
	Main = '/',
	Patient = 'patient/:id',
	Login = '/login',
	Register = '/register',
	Doctor = '/doctor',
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

const validationMessages = {
	requiredField: 'Обязательное поле',
	invalidEmail: 'Неверный формат email',

	futureDateError: 'Дата не может быть в будущем',
	passwordRequirements:
		'Пароль должен содержать минимум 8 символов, включая заглавные буквы, строчные буквы и цифры.',
	minLengthError: 'Не меньше 3 символов',
	greaterThanZero: 'Введите значение больше 0',
}

const emailPattern = /^\S+@\S+$/i
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

export { AppRoute, Status, FormFields, validationMessages, emailPattern, passwordPattern }

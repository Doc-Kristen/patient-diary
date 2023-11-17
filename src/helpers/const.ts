import { IColumn } from 'types/HealthJournal'

enum AppRoute {
	Main = '/',
	Patient = 'patient/:id',
	Login = '/login',
	Register = '/registration',
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
	maxLengthError: 'Не более 500 символов',
	greaterThanZero: 'Введите значение больше 0',
}

const emailPattern = /^\S+@\S+$/i
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

const columns: readonly IColumn[] = [
	{ id: 'datetime', label: 'Дата' },
	{
		id: 'bloodPressure',
		label: 'АД (мм.рт.ст)',
	},
	{
		id: 'heartRate',
		label: 'ЧСС (уд/мин)',
	},
	{
		id: 'medications',
		label: 'Препараты',
	},
	{
		id: 'complaints',
		label: 'Жалобы',
	},
	{
		id: 'edit',
		label: 'Редактировать',
	},
	{
		id: 'delete',
		label: 'Удалить',
	},
]

export { AppRoute, Status, FormFields, validationMessages, emailPattern, passwordPattern, columns }

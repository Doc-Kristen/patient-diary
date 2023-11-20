import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '@services/api'
import { AuthResponse, User, UserAuth, UserSignIn } from 'types/User'

// Авторизация пользователя
export const login = createAsyncThunk<UserAuth, UserSignIn>('auth/login', async userData => {
	const { data } = await api.post<UserAuth>('/auth/login', userData)
	return data
})

// Регистрация пользователя
export const registration = createAsyncThunk<UserAuth, User>(
	'auth/registration',
	async userData => {
		const { data } = await api.post<UserAuth>('/auth/registration', userData)
		return data
	},
)

// Проверка статуса авторизации пользователя
export const checkAuth = createAsyncThunk<AuthResponse>('auth/checkAuth', async () => {
	const { data } = await api.get<AuthResponse>('/auth/login')
	return data
})

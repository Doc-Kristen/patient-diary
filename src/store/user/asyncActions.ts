import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppRoute } from '@helpers/const'
import api from '@services/api'
import { User, UserAuth, UserSignIn } from 'types/User'

// Авторизация пользователя
export const postLogin = createAsyncThunk<UserAuth, UserSignIn>('user/postLogin', async userData => {
	const { data } = await api.post(AppRoute.Login, userData)
	return data
})

export const postRegister = createAsyncThunk<UserAuth, User>('user/postRegister', async userData => {
	const { data } = await api.post(AppRoute.Register, userData)
	return data
})

import { createSlice } from '@reduxjs/toolkit'
import { checkAuth, login, logout, registration } from './asyncActions'
import { UserAuth } from 'types/User'
import { Status } from '@helpers/const'
import { dropToken, saveToken } from '@services/token'

interface IUserState {
	isAuth: boolean
	userData: UserAuth | null
	isError: boolean
	authStatus: Status | null
}

const initialState: IUserState = {
	isAuth: false,
	userData: null,
	isError: false,
	authStatus: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLoginStatus(state, action) {
			state.isAuth = action.payload
		},
		setErrorStatus(state, action) {
			state.isError = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(login.pending, state => {
			state.isAuth = false
			state.isError = false
			state.authStatus = Status.PENDING
		})
		builder.addCase(login.fulfilled, (state, action) => {
			state.userData = action.payload
			saveToken(action.payload.accessToken)
			state.isAuth = true
			state.isError = false
			state.authStatus = Status.SUCCESS
		})
		builder.addCase(login.rejected, state => {
			state.isAuth = false
			state.isError = true
			state.authStatus = Status.ERROR
		})
		builder.addCase(registration.pending, state => {
			state.isAuth = false
			state.authStatus = Status.PENDING
		})
		builder.addCase(registration.fulfilled, (state, action) => {
			state.userData = action.payload
			saveToken(action.payload.accessToken)
			state.isAuth = true
			state.isError = false
			state.authStatus = Status.SUCCESS
		})
		builder.addCase(registration.rejected, state => {
			state.isAuth = false
			state.isError = true
			state.authStatus = Status.ERROR
		})
		builder.addCase(checkAuth.fulfilled, (state, action) => {
			state.isAuth = action.payload.isAuthenticated
			state.isError = false
			state.authStatus = Status.SUCCESS
		})
		builder.addCase(checkAuth.pending, state => {
			state.isError = false
			state.authStatus = Status.PENDING
		})
		builder.addCase(checkAuth.rejected, state => {
			state.isAuth = false
			state.isError = true
			state.authStatus = Status.ERROR
		})
		builder.addCase(logout.fulfilled, state => {
			dropToken()
			state.isAuth = false
			state.isError = false
			state.authStatus = Status.SUCCESS
		})
		builder.addCase(logout.pending, state => {
			state.isError = false
			state.authStatus = Status.PENDING
		})
		builder.addCase(logout.rejected, state => {
			state.isError = true
			state.authStatus = Status.SUCCESS
		})
	},
})

export const { setLoginStatus, setErrorStatus } = authSlice.actions

export default authSlice.reducer

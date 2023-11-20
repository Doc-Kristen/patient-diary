import { createSlice } from '@reduxjs/toolkit'
import { checkAuth, login, registration } from './asyncActions'
import { UserAuth } from 'types/User'
import { Status } from '@helpers/const'

interface IUserState {
	isAuth: boolean
	userData: UserAuth | null
	isError: boolean
	authStatus: Status
}

const initialState: IUserState = {
	isAuth: false,
	userData: null,
	isError: false,
	authStatus: Status.PENDING,
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
		})
		builder.addCase(login.fulfilled, (state, action) => {
			state.userData = action.payload
			localStorage.setItem('token', action.payload.accessToken)
			state.isAuth = true
			state.isError = false
		})
		builder.addCase(login.rejected, state => {
			state.isAuth = false
			state.isError = true
		})
		builder.addCase(registration.pending, state => {
			state.isAuth = false
		})
		builder.addCase(registration.fulfilled, (state, action) => {
			state.userData = action.payload
			localStorage.setItem('token', action.payload.accessToken)
			state.isAuth = true
			state.isError = false
		})
		builder.addCase(registration.rejected, state => {
			state.isAuth = false
			state.isError = true
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
	},
})

export const { setLoginStatus, setErrorStatus } = authSlice.actions

export default authSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { login, registration } from './asyncActions'
import { UserAuth } from 'types/User'

interface userState {
	isAuth: boolean
	userData: UserAuth | null
	isError: boolean
}

const initialState: userState = {
	isAuth: false,
	userData: null,
	isError: false,
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
			state.isAuth = true
			console.log(action.payload)
			localStorage.setItem('token', action.payload.accessToken)
		})
		builder.addCase(registration.rejected, state => {
			state.isAuth = false
		})
	},
})

export const { setLoginStatus, setErrorStatus } = authSlice.actions

export default authSlice.reducer

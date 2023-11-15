import { createSlice } from '@reduxjs/toolkit'
import { login, registration } from './asyncActions'
import { UserAuth } from 'types/User'

interface userState {
	isAuth: boolean
	userData: UserAuth | null
}

const initialState: userState = {
	isAuth: false,
	userData: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLoginStatus(state, action) {
			state.isAuth = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(login.pending, state => {
			state.isAuth = false
		})
		builder.addCase(login.fulfilled, (state, action) => {
			state.isAuth = true
			state.userData = action.payload
			localStorage.setItem('token', action.payload.accessToken)
		})
		builder.addCase(login.rejected, state => {
			state.isAuth = false
		})
		builder.addCase(registration.pending, state => {
			state.isAuth = false
		})
		builder.addCase(registration.fulfilled, (state, action) => {
			state.isAuth = true
			state.userData = action.payload
			console.log(action.payload)
			localStorage.setItem('token', action.payload.accessToken)
		})
		builder.addCase(registration.rejected, state => {
			state.isAuth = false
		})
	},
})

export const { setLoginStatus } = userSlice.actions

export default userSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { postLogin, postRegister } from './asyncActions'
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
		builder.addCase(postLogin.pending, state => {
			state.isAuth = false
		})
		builder.addCase(postLogin.fulfilled, (state, action) => {
			state.isAuth = true
			state.userData = action.payload
		})
		builder.addCase(postLogin.rejected, state => {
			state.isAuth = false
		})
		builder.addCase(postRegister.pending, state => {
			state.isAuth = false
		})
		builder.addCase(postRegister.fulfilled, (state, action) => {
			state.isAuth = true
			state.userData = action.payload
		})
		builder.addCase(postRegister.rejected, state => {
			state.isAuth = false
		})
	},
})

export const { setLoginStatus } = userSlice.actions

export default userSlice.reducer

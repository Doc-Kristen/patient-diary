import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import userData from './userData/slice'
import auth from './auth/slice'

export const store = configureStore({
	reducer: {
		userData,
		auth,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false, // Временно отключает проверку на сериализуемость
		}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

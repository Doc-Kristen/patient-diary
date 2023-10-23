import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import journal from './journal/slice'
import user from './user/slice'

export const store = configureStore({
	reducer: {
		journal,
		user,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false, // Временно отключает проверку на сериализуемость
		}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

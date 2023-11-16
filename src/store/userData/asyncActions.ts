import { createAsyncThunk } from '@reduxjs/toolkit'
import { HealthEntry } from 'types/HealthJournal'
import api from '@services/api'
import { UserData } from 'types/User'

// Запрос данных пользователя по id
export const fetchUser = createAsyncThunk<UserData, string>('userData/fetchUser', async userId => {
	const { data } = await api.get<UserData>(`/users/${userId}`)
	return data
})

// Добавление новой записи в журнал
export const createJournalEntry = createAsyncThunk<HealthEntry, HealthEntry>(
	'journal/createJournalEntry',
	async entryData => {
		const { data } = await api.post('/journal', entryData)
		return data
	},
)

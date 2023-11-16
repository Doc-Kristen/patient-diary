import { createAsyncThunk } from '@reduxjs/toolkit'
import { HealthEntry } from 'types/HealthJournal'
import api from '@services/api'

// Запрос всех записей по id пользователя
export const fetchUser = createAsyncThunk<HealthEntry[], string>('userData/fetchUser', async userId => {
	const { data } = await api.get(`/users/${userId}`)
	const { journal } = data // временное решение до создания рабочего бэкенда
	return journal
})

// Добавление новой записи в журнал
export const createJournalEntry = createAsyncThunk<
	HealthEntry,
	{ userId: string; entryData: HealthEntry }
>('journal/createJournalEntry', async ({ userId, entryData }) => {
	const { data } = await api.post(`medicalData/${userId}`, entryData)
	return data
})

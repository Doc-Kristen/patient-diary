import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BACKEND_URL } from '@helpers/const'
import { HealthEntry } from 'types/HealthJournal'

// Запрос всех записей по id пользователя
export const fetchJournal = createAsyncThunk<HealthEntry[], string>(
	'journal/fetchJournalStatus',
	async userId => {
		const { data } = await axios.get(`${BACKEND_URL}/medicalData/${userId}`)
		const { journal } = data // временное решение до создания рабочего бэкенда
		return journal
	},
)

// Добавление новой записи в журнал
export const createJournalEntry = createAsyncThunk<
	HealthEntry,
	{ userId: string; entryData: HealthEntry }
>('journal/createJournalEntry', async ({ userId, entryData }) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}

	const { data } = await axios.post(`${BACKEND_URL}medicalData/${userId}`, entryData, config)
	return data
})

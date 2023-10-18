import { createAsyncThunk } from '@reduxjs/toolkit'
import { HealthEntry } from 'types/index'
import axios from 'axios'
import { BACKEND_URL } from '@utils/const'

export const fetchJournal = createAsyncThunk<HealthEntry[]>(
	'journal/fetchJournalStatus',
	async () => {
		return axios.get(`${BACKEND_URL}/data`).then(response => response.data)
	},
)

import { createSlice } from '@reduxjs/toolkit'
import { Status } from '@utils/const'
import HealthEntry from 'types/HealthEntry'
import { fetchJournal } from './asyncActions'

interface JournalState {
	data: HealthEntry[]
	status: Status
}

const initialState: JournalState = {
	data: [] as HealthEntry[],
	status: Status.LOADING,
}

const journalSlice = createSlice({
	name: 'journal',
	initialState,
	reducers: {
		setData(state, action) {
			state.data = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchJournal.pending, state => {
			state.status = Status.LOADING
		})
		builder.addCase(fetchJournal.fulfilled, (state, action) => {
			state.status = Status.SUCCESS
			state.data = action.payload
		})
		builder.addCase(fetchJournal.rejected, state => {
			state.status = Status.ERROR
			state.data = []
		})
	},
})

export const { setData } = journalSlice.actions

export default journalSlice.reducer

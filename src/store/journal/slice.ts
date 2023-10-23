import { createSlice } from '@reduxjs/toolkit'
import { Status } from '@utils/const'
import { HealthEntry } from 'types/HealthJournal'
import { createJournalEntry, fetchJournal } from './asyncActions'

interface JournalState {
	data: HealthEntry[]
	dataStatus: Status
	entryStatus: Status | null
}

const initialState: JournalState = {
	data: [] as HealthEntry[],
	dataStatus: Status.PENDING,
	entryStatus: null,
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
			state.dataStatus = Status.PENDING
		})
		builder.addCase(fetchJournal.fulfilled, (state, action) => {
			state.dataStatus = Status.SUCCESS
			state.data = action.payload

		})
		builder.addCase(fetchJournal.rejected, state => {
			state.dataStatus = Status.ERROR
			state.data = []
		})
		builder.addCase(createJournalEntry.pending, state => {
			state.entryStatus = Status.PENDING
		})
		builder.addCase(createJournalEntry.fulfilled, state => {
			state.entryStatus = Status.SUCCESS
		})
		builder.addCase(createJournalEntry.rejected, state => {
			state.entryStatus = Status.ERROR
		})
	},
})

export const { setData } = journalSlice.actions

export default journalSlice.reducer

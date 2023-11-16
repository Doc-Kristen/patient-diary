import { createSlice } from '@reduxjs/toolkit'
import { Status } from '@helpers/const'
import { HealthEntry } from 'types/HealthJournal'
import { createJournalEntry, fetchUser } from './asyncActions'

interface UserDataState {
	data: HealthEntry[]
	dataStatus: Status
	entryStatus: Status | null
}

const initialState: UserDataState = {
	data: [] as HealthEntry[],
	dataStatus: Status.PENDING,
	entryStatus: null,
}

const userDataSlice = createSlice({
	name: 'journal',
	initialState,
	reducers: {
		setData(state, action) {
			state.data = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchUser.pending, state => {
			state.dataStatus = Status.PENDING
		})
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.dataStatus = Status.SUCCESS
			state.data = action.payload
		})
		builder.addCase(fetchUser.rejected, state => {
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

export const { setData } = userDataSlice.actions

export default userDataSlice.reducer

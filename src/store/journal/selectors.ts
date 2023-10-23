import { RootState } from '@store/store'

export const selectJournalData = (state: RootState) => state.journal.data

export const selectJournalStatus = (state: RootState) => state.journal.dataStatus

export const selectEntryStatus = (state: RootState) => state.journal.entryStatus
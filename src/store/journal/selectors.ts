import { RootState } from '@store/store'

export const selectJournalData = (state: RootState) => state.journal.data

export const selectJournal = (state: RootState) => state.journal

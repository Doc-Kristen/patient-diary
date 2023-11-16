import { RootState } from '@store/store'

export const selectJournalData = (state: RootState) => state.userData.data

export const selectJournalStatus = (state: RootState) => state.userData.dataStatus

export const selectEntryStatus = (state: RootState) => state.userData.entryStatus
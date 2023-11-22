import { RootState } from '@store/store'

export const selectJournal = (state: RootState) => state.userData.data.journal

export const selectDataStatus = (state: RootState) => state.userData.dataStatus

export const selectEntryStatus = (state: RootState) => state.userData.entryStatus

export const selectUser = (state: RootState) => state.userData.data
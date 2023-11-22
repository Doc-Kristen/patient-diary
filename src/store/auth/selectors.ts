import { RootState } from '@store/store'

export const selectUserId = (state: RootState) => state.auth.userData?.userId

export const selectIsAuth = (state: RootState) => state.auth.isAuth

export const selectIsError = (state: RootState) => state.auth.isError

export const selectAuthStatus = (state: RootState) => state.auth.authStatus

export const selectFetchStatus = (state: RootState) => state.auth.fetchStatus

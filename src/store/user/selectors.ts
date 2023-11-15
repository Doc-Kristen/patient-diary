import { RootState } from '@store/store'

export const selectUserId = (state: RootState) => state.user.userData?.userId

export const selectIsAuth = (state: RootState) => state.user.isAuth

export const selectIsError = (state: RootState) => state.user.isError

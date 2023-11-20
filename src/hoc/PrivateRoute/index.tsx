import { Navigate, Outlet } from 'react-router-dom'

import React from 'react'
import { AppRoute, Status } from '@helpers/const'
import { useSelector } from 'react-redux'
import { selectAuthStatus, selectIsAuth } from '@store/auth/selectors'
import { useAppDispatch } from '@store/store'
import { checkAuth } from '@store/auth/asyncActions'

const PrivateRoute: React.FC = () => {
	const dispatch = useAppDispatch()
	const isAuth = useSelector(selectIsAuth)
	const authStatus = useSelector(selectAuthStatus)
	React.useEffect(() => {
		dispatch(checkAuth())
	}, [dispatch])

	if (authStatus === Status.PENDING) {
		return <div>Загрузка</div>
	}

	if (authStatus === Status.ERROR) {
		return <div>Ошибка при загрузке данных</div>
	}

	return isAuth ? <Outlet /> : <Navigate to={AppRoute.Main} />
}

export default PrivateRoute

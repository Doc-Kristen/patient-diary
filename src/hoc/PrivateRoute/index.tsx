import { Navigate, Outlet } from 'react-router-dom'

import React from 'react'
import { AppRoute } from '@helpers/const'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '@store/auth/selectors'

const PrivateRoute: React.FC = () => {
	const isAuth = useSelector(selectIsAuth)

	return isAuth ? <Outlet /> : <Navigate to={AppRoute.Main} />
}

export default PrivateRoute

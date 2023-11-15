import { Navigate, Outlet } from 'react-router-dom'

import React from 'react'
import { AppRoute } from '@helpers/const'

const PrivateRoute: React.FC = () => {
	const isAuth = false

	return isAuth ? <Outlet /> : <Navigate to={AppRoute.Main} />
}

export default PrivateRoute

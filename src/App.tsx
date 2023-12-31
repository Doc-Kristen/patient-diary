import React from 'react'
import { Patient, Doctor, NotFound, Login, Main, Register } from '@pages/index'
import { Route, Routes } from 'react-router-dom'
import { AppRoute } from '@helpers/const'
import { MainLayout } from './layouts/index'
import { PrivateRoute } from './hoc'

const App: React.FC = () => {
	return (
		<Routes>
			<Route path={AppRoute.Main} element={<MainLayout />}>
				<Route element={<PrivateRoute />}>
					<Route path={AppRoute.Patient} element={<Patient />} />
					<Route path={AppRoute.Doctor} element={<Doctor />} />
				</Route>
				<Route index element={<Main />} />
				<Route path={AppRoute.Login} element={<Login />} />
				<Route path={AppRoute.Register} element={<Register />} />
				<Route path={AppRoute.NotFound} element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App

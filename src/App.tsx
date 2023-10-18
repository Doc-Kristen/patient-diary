import React from 'react'
import { Patient, Doctor, NotFound, Authorization } from '@pages/index'
import { Route, Routes } from 'react-router-dom'
import { AppRoute } from '@utils/const'
import { MainLayout } from './layouts/index'
const App: React.FC = () => {
	return (
		<Routes>
			<Route path={AppRoute.Main} element={<MainLayout />}>
				<Route path={AppRoute.Authorization} element={<Authorization />} />
				<Route path={AppRoute.Patient} element={<Patient />} />
				<Route path={AppRoute.Doctor} element={<Doctor />} />
				<Route path={AppRoute.NotFound} element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App

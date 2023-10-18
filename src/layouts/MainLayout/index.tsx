import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'
import { Header } from '@components/index'

const MainLayout: React.FC = () => {
	return (
		<>
			<Header />
			<Container style={{ paddingTop: 80 }}>
				<Outlet />
			</Container>
		</>
	)
}

export default MainLayout

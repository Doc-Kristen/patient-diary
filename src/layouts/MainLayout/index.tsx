import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

const MainLayout: React.FC = () => {
	return (
		<>
			<Container style={{ paddingTop: 80 }}>
				<Outlet />
			</Container>
		</>
	)
}

export default MainLayout

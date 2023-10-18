import React from 'react'
import { Typography, AppBar, Toolbar } from '@mui/material'

const Header: React.FC = () => {
	return (
		<AppBar position='fixed'>
			<Toolbar>
				<Typography variant='h6' component='h1'>
					Patient diary
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default Header

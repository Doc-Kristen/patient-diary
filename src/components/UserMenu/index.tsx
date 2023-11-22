import { AppRoute } from '@helpers/const'
import { AccountCircle } from '@mui/icons-material'
import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { selectUser } from '@store/userData/selectors'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserMenu: React.FC = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const { lastName, firstName, email } = useSelector(selectUser)

	const hasName = firstName && lastName
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
			<IconButton
				size='large'
				aria-label='account of current user'
				aria-controls='menu-appbar'
				aria-haspopup='true'
				onClick={handleMenu}
				color='inherit'>
				<AccountCircle />
			</IconButton>
			<Menu
				id='menu-appbar'
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				<MenuItem onClick={handleClose}>Профиль</MenuItem>
				<MenuItem onClick={handleClose}>Настройки приложения</MenuItem>
			</Menu>
			<Typography>Здравствуйте, {hasName || email}!</Typography>
			<Button component={Link} to={AppRoute.Main} color='inherit'>
				Выйти
			</Button>
		</Box>
	)
}

export default UserMenu

import { Status } from '@helpers/const'
import { AccountCircle } from '@mui/icons-material'
import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { logout } from '@store/auth/asyncActions'
import { selectFetchStatus } from '@store/auth/selectors'
import { useAppDispatch } from '@store/store'
import { selectUser } from '@store/userData/selectors'
import React from 'react'
import { useSelector } from 'react-redux'

const UserMenu: React.FC = () => {
	const dispatch = useAppDispatch()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

	const fetchStatus = useSelector(selectFetchStatus)

	const onClickMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const onClose = () => {
		setAnchorEl(null)
	}

	const onLogoutButton = () => {
		dispatch(logout())
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
				onClick={onClickMenu}
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
				onClose={onClose}>
				<MenuItem onClick={onClose}>Профиль</MenuItem>
				<MenuItem onClick={onClose}>Настройки приложения</MenuItem>
			</Menu>
			<Typography>Здравствуйте, {hasName || email}!</Typography>
			<Button onClick={onLogoutButton} variant='outlined' color='inherit'>
				{fetchStatus === Status.PENDING ? 'Выход из аккаунта...' : 'Выйти'}
			</Button>
		</Box>
	)
}

export default UserMenu

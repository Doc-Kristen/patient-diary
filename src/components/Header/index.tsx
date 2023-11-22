import React from 'react'
import { Typography, AppBar, Toolbar, Button, ListItem } from '@mui/material'
import { selectIsAuth } from '@store/auth/selectors'
import { useSelector } from 'react-redux'
import UserMenu from '@components/UserMenu'
import { Link } from 'react-router-dom'
import { AppRoute } from '@helpers/const'

const Header: React.FC = () => {
	const navItems = [
		{ title: 'Войти', url: AppRoute.Main },
		{ title: 'Зарегистрироваться', url: AppRoute.Register },
	]
	const isAuth = useSelector(selectIsAuth)
	return (
		<AppBar position='fixed'>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography variant='h6' component='h1'>
					Patient's diary
				</Typography>
				{isAuth ? (
					<UserMenu />
				) : (
					<nav>
						{navItems.map(item => (
							<ListItem key={item.title} disablePadding>
								<Button component={Link} to={item.url} variant='contained' color='primary'>
									{item.title}
								</Button>
							</ListItem>
						))}
					</nav>
				)}
			</Toolbar>
		</AppBar>
	)
}

export default Header

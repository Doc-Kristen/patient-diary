import { AppRoute } from '@helpers/const'
import { Button, Container } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Main: React.FC = () => {
	return (
		<Container sx={{display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', alignItems: 'center'}}>
			<Link to={AppRoute.Login}>
				<Button variant='contained' color='primary'>
					Войти
				</Button>
			</Link>
			<Link to={AppRoute.Register}>
				<Button variant='contained' color='primary'>
					Зарегистрироваться
				</Button>
			</Link>
		</Container>
	)
}

export default Main

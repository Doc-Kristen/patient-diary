import React from 'react'
import {
	Container,
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Box,
	Typography,
} from '@mui/material'
import MonitorHeart from '@mui/icons-material/MonitorHeart'

const AuthorizationForm: React.FC = () => {
	const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		console.log({
			email: data.get('email'),
			password: data.get('password'),
		})
	}

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
					<MonitorHeart />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Авторизация
				</Typography>
				<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email'
						name='email'
						autoComplete='email'
						autoFocus
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Пароль'
						type='password'
						id='password'
						autoComplete='current-password'
					/>
					<FormControlLabel
						control={<Checkbox value='remember' color='primary' />}
						label='Запомнить пароль'
					/>
					<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
						Войти
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href='#' variant='body2'>
								Забыли пароль?
							</Link>
						</Grid>
						<Grid item>
							<Link href='#' variant='body2'>
								{'Зарегистрироваться?'}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	)
}

export default AuthorizationForm

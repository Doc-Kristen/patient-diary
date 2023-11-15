import React from 'react'
import {
	Container,
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Grid,
	Box,
	Typography,
	Alert,
	Snackbar,
} from '@mui/material'
import MonitorHeart from '@mui/icons-material/MonitorHeart'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UserSignIn } from 'types/User'
import { Link, useNavigate } from 'react-router-dom'
import { AppRoute, emailPattern, validationMessages } from '@helpers/const'
import { useAppDispatch } from '@store/store'
import { login } from '@store/user/asyncActions'
import { selectIsError, selectUserId } from '@store/user/selectors'
import { useSelector } from 'react-redux'
import { setErrorStatus } from '@store/user/slice'

const SignIn: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const autoHideDuration = 3000 // время, через которое скрывается сообщение в случае ошибки

	const userId = useSelector(selectUserId)
	const isError = useSelector(selectIsError)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserSignIn>()

	const getErrorSettings = (fieldName: keyof UserSignIn) => {
		const error: boolean = !!errors[fieldName]
		const helperText = errors[fieldName]?.message || ''
		return { error, helperText }
	}

	const onSubmit: SubmitHandler<UserSignIn> = async formData => {
		dispatch(login(formData))
	}

	React.useEffect(() => {
		if (userId) {
			navigate(`/patient/${userId}`) // перенаправление на страницу пользователя, если авторизован
		}
	}, [userId, navigate])

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
				<Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email'
						autoComplete='email'
						autoFocus
						{...register('email', {
							required: validationMessages.requiredField,
							pattern: {
								value: emailPattern,
								message: validationMessages.invalidEmail,
							},
						})}
						{...getErrorSettings('email')}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						label='Пароль'
						type='password'
						id='password'
						autoComplete='current-password'
						{...register('password', {
							required: validationMessages.requiredField,
						})}
						{...getErrorSettings('password')}
					/>
					<FormControlLabel
						control={<Checkbox color='primary' {...register('remember')} />}
						label='Запомнить пароль'
					/>
					<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
						Войти
					</Button>
					<Snackbar
						open={isError}
						autoHideDuration={autoHideDuration}
						onClose={() => dispatch(setErrorStatus(false))}>
						<Alert severity='error'>Проверьте правильность логина и пароля</Alert>
					</Snackbar>
					<Grid container>
						<Grid item xs>
							<Link to='#'>Забыли пароль?</Link>
						</Grid>
						<Grid item>
							<Link to={AppRoute.Register}>{'Зарегистрироваться'}</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	)
}

export default SignIn

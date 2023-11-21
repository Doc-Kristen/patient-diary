import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'
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
	InputAdornment,
	IconButton,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import MonitorHeart from '@mui/icons-material/MonitorHeart'
import { UserSignIn } from 'types/User'
import { AppRoute, Status, emailPattern, validationMessages } from '@helpers/const'
import { useAppDispatch } from '@store/store'
import { login } from '@store/auth/asyncActions'
import { selectAuthStatus, selectUserId } from '@store/auth/selectors'

const SignIn: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const userId = useSelector(selectUserId)
	const authStatus = useSelector(selectAuthStatus)
	const isDisabledForm = authStatus === Status.PENDING

	const [showPassword, setShowPassword] = React.useState<boolean>(false)

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
			navigate(`/patient/${userId}`) // перенаправление на страницу пользователя, если авторизация прошла успешно
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
						disabled={isDisabledForm}
						{...getErrorSettings('email')}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						label='Пароль'
						type={showPassword ? 'text' : 'password'}
						id='password'
						autoComplete='current-password'
						{...register('password', {
							required: validationMessages.requiredField,
						})}
						disabled={isDisabledForm}
						{...getErrorSettings('password')}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={() => setShowPassword(!showPassword)}
										edge='end'>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<FormControlLabel
						control={<Checkbox color='primary' {...register('remember')} />}
						label='Запомнить пароль'
						disabled={isDisabledForm}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						disabled={isDisabledForm}
						sx={{ mt: 3, mb: 2 }}>
						{authStatus === Status.PENDING ? 'Вход...' : 'Войти'}
					</Button>
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

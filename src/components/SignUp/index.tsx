import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
	Box,
	Grid,
	TextField,
	CssBaseline,
	Button,
	Typography,
	Container,
	InputAdornment,
	IconButton,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { User } from 'types/User'
import { AppRoute, Status, emailPattern, passwordPattern, validationMessages } from '@helpers/const'
import { isDateValid } from '@helpers/utils'
import { useAppDispatch } from '@store/store'
import { registration } from '@store/auth/asyncActions'
import { selectFetchStatus, selectIsAuth, selectUserId } from '@store/auth/selectors'

const SignUp: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const userId = useSelector(selectUserId)
	const fetchStatus = useSelector(selectFetchStatus)
	const isAuth = useSelector(selectIsAuth)
	const isDisabledForm = fetchStatus === Status.PENDING
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<User>()

	const [showPassword, setShowPassword] = React.useState<boolean>(false)

	const getErrorSettings = (fieldName: keyof User) => {
		const error: boolean = !!errors[fieldName]
		const helperText = errors[fieldName]?.message || ''
		return { error, helperText }
	}

	const onSubmit: SubmitHandler<User> = async formData => {
		dispatch(registration(formData))
	}

	React.useEffect(() => {
		if (userId && isAuth) {
			navigate(`/patient/${userId}`) // перенаправление на страницу пользователя, если авторизован
		}
	}, [isAuth, navigate, userId])

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
				<Typography component='h1' variant='h5'>
					Регистрация
				</Typography>
				<Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete='given-name'
								fullWidth
								id='firstName'
								label='Имя'
								type='text'
								{...register('firstName', {
									minLength: { value: 1, message: 'Не меньше 1 символa' },
									maxLength: { value: 30, message: 'Не больше 30 символов' },
								})}
								disabled={isDisabledForm}
								{...getErrorSettings('firstName')}
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								id='lastName'
								label='Фамилия'
								autoComplete='family-name'
								{...register('lastName', {
									minLength: { value: 1, message: 'Не меньше 1 символа' },
									maxLength: { value: 30, message: 'Не больше 30 символов' },
								})}
								disabled={isDisabledForm}
								{...getErrorSettings('lastName')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id='birthday'
								label='Дата рождения'
								type='date'
								sx={{ width: '100%' }}
								InputLabelProps={{
									shrink: true,
								}}
								{...register('birthday', {
									validate: {
										validDate: value =>
											value ? isDateValid(value) || 'Дата не может быть в будущем' : true,
									},
								})}
								disabled={isDisabledForm}
								{...getErrorSettings('birthday')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								id='email'
								label='Email'
								autoComplete='email'
								required
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
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								label='Пароль'
								type={showPassword ? 'text' : 'password'}
								id='password'
								autoComplete='new-password'
								{...register('password', {
									required: validationMessages.requiredField,
									pattern: {
										value: passwordPattern,
										message: validationMessages.passwordRequirements,
									},
								})}
								disabled={isDisabledForm}
								{...getErrorSettings('password')}
								helperText='Минимум 8 символов, включая цифру, заглавную и строчную латинскую букву'
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
						</Grid>
					</Grid>
					<Button
						type='submit'
						disabled={isDisabledForm}
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}>
						{fetchStatus === Status.PENDING ? 'Отправка данных...' : 'Зарегистрироваться'}
					</Button>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Link to={AppRoute.Login}>Уже зарегистрированы? Войти</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	)
}

export default SignUp

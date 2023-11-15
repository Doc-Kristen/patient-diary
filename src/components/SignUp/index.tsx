import React from 'react'
import {
	Box,
	Grid,
	TextField,
	CssBaseline,
	Button,
	Typography,
	Container,
	Alert,
	Snackbar,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { User } from 'types/User'
import { AppRoute, emailPattern, passwordPattern, validationMessages } from '@helpers/const'
import { isDateValid } from '@helpers/utils'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@store/store'
import { registration } from '@store/auth/asyncActions'
import { useSelector } from 'react-redux'
import { selectIsError, selectUserId } from '@store/auth/selectors'
import { setErrorStatus } from '@store/auth/slice'

const SignUp: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const autoHideDuration = 3000 // время, через которое скрывается сообщение в случае ошибки
	const isError = useSelector(selectIsError)

	const userId = useSelector(selectUserId)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<User>()

	const getErrorSettings = (fieldName: keyof User) => {
		const error: boolean = !!errors[fieldName]
		const helperText = errors[fieldName]?.message || ''
		return { error, helperText }
	}

	const onSubmit: SubmitHandler<User> = async formData => {
		dispatch(registration(formData))
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
								{...getErrorSettings('email')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								label='Пароль'
								type='password'
								id='password'
								autoComplete='new-password'
								{...register('password', {
									required: validationMessages.requiredField,
									pattern: {
										value: passwordPattern,
										message: validationMessages.passwordRequirements,
									},
								})}
								{...getErrorSettings('password')}
							/>
						</Grid>
					</Grid>
					<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
						Зарегистрироваться
					</Button>
					<Snackbar
						open={isError}
						autoHideDuration={autoHideDuration}
						onClose={() => dispatch(setErrorStatus(false))}>
						<Alert severity='error'>Не удалось зарегистрироваться</Alert>
					</Snackbar>
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

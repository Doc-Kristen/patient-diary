import React from 'react'
import { useSelector } from 'react-redux'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import dayjs from 'dayjs'
// import { v4 as uuidv4 } from 'uuid'
import { TextField, Stack, Button, Alert } from '@mui/material'
import { createJournalEntry, fetchJournal } from '@store/journal/asyncActions'
import { useAppDispatch } from '@store/store'
import { HealthEntry } from 'types/HealthJournal'
import { FormFields, Status } from '@utils/const'
import { selectEntryStatus } from '@store/journal/selectors'

type FormJournalProps = {
	setIsOpen: (arg: boolean) => void
	id: string
}

// форма для новой записи
const FormJournal: React.FC<FormJournalProps> = ({ setIsOpen, id }) => {
	const dispatch = useAppDispatch()

	const date = dayjs().format('YYYY-MM-DDTHH:mm')
	// const fakeId = uuidv4()
	const REQUIRED_FIELD_MESSAGE = 'Обязательное поле'
	const POSITIVE_INTEGER_MESSAGE = 'Введите значение больше 0'

	const [isError, setIsError] = React.useState(false)

	const entryStatus = useSelector(selectEntryStatus)
	const isDisabledForm = entryStatus === Status.PENDING

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<HealthEntry>()

	// настройки для текстовых подсказок в случае ошибки
	const getErrorSettings = (fieldName: keyof HealthEntry) => {
		const error = !!errors[fieldName]
		const helperText = errors[fieldName] ? errors[fieldName]?.message : ''
		return { error, helperText }
	}

	// функция для генерации полей ввода
	const renderTextField = (
		id: string,
		label: string,
		type: string,
		fieldName: FormFields,
		validation: RegisterOptions,
		defaultValue?: string,
	) => (
		<TextField
			id={id}
			label={label}
			type={type}
			defaultValue={defaultValue || ''}
			InputLabelProps={{
				shrink: true,
			}}
			{...register(fieldName, validation)}
			disabled={isDisabledForm}
			{...getErrorSettings(fieldName)}
		/>
	)

	const onSubmit: SubmitHandler<HealthEntry> = async formData => {
		const response = await dispatch(createJournalEntry({ userId: id, entryData: formData }))
		if (createJournalEntry.fulfilled.match(response)) {
			dispatch(fetchJournal(id))
			setIsOpen(false)
		} else {
			setIsError(true) // показ сообщения об ошибке
			setTimeout(() => {
				setIsError(false)
			}, 3000)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
			<Stack spacing={2}>
				{renderTextField(
					FormFields.DATETIME,
					'Дата и время',
					'datetime-local',
					FormFields.DATETIME,
					{
						min: 0,
						required: REQUIRED_FIELD_MESSAGE,
					},
					date,
				)}
				{renderTextField(FormFields.SYSTOLIC, 'АД сист.', 'number', FormFields.SYSTOLIC, {
					min: {
						value: 0,
						message: POSITIVE_INTEGER_MESSAGE,
					},
					required: REQUIRED_FIELD_MESSAGE,
				})}
				{renderTextField(FormFields.DIASTOLIC, 'АД диаст.', 'number', FormFields.DIASTOLIC, {
					min: {
						value: 0,
						message: POSITIVE_INTEGER_MESSAGE,
					},
					required: REQUIRED_FIELD_MESSAGE,
				})}
				{renderTextField(FormFields.HEART_RATE, 'ЧСС', 'number', FormFields.HEART_RATE, {
					min: {
						value: 0,
						message: 'Введите значение больше 0',
					},
					required: REQUIRED_FIELD_MESSAGE,
				})}
				{renderTextField(FormFields.COMPLAINTS, 'Жалобы', 'text', FormFields.COMPLAINTS, {
					minLength: { value: 4, message: 'Не меньше 4 символов' },
				})}
				{renderTextField(FormFields.MEDICATIONS, 'Лекарства', 'text', FormFields.MEDICATIONS, {
					minLength: { value: 4, message: 'Не меньше 4 символов' },
				})}
			</Stack>
			<Button type='submit' disabled={isDisabledForm} sx={{ alignSelf: 'end', margin: '5px' }}>
				{entryStatus === Status.PENDING ? 'Сохранение...' : 'Сохранить'}
			</Button>
			{isError && <Alert severity='error'>Ошибка. Данные не сохранены</Alert>}
		</form>
	)
}

export default FormJournal

import React from 'react'
import { useSelector } from 'react-redux'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { TextField, Stack, Button, Alert } from '@mui/material'
import { createJournalEntry, fetchUser, updateJournalEntry } from '@store/userData/asyncActions'
import { useAppDispatch } from '@store/store'
import { HealthEntry } from 'types/HealthJournal'
import { FormFields, Status, validationMessages } from '@helpers/const'
import { selectEntryStatus } from '@store/userData/selectors'
import { isDateValid } from '@helpers/utils'

type FormJournalProps = {
	setIsOpen: (arg: boolean) => void
	id: string
	initialValues?: HealthEntry
}

// форма для новой записи
const FormJournal: React.FC<FormJournalProps> = ({ setIsOpen, id, initialValues }) => {
	const dispatch = useAppDispatch()

	const date = dayjs().format('YYYY-MM-DDTHH:mm')

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
		// сразу переводим данные в числа, так как будут использоваться в сложных расчетах
		formData.systolic = +formData.systolic
		formData.diastolic = +formData.diastolic
		formData.heartRate = +formData.heartRate

		// выбор сценария запроса в зависимости от цели (редактирование, создание новой записи)
		const asyncAction  = initialValues ? updateJournalEntry : createJournalEntry
		const saveAction  = initialValues
			? updateJournalEntry({ ...formData, id: initialValues.id })
			: createJournalEntry(formData)

		const response = await dispatch(saveAction )
		if (asyncAction .fulfilled.match(response)) {
			dispatch(fetchUser(id))
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
						required: validationMessages.requiredField,
						validate: {
							validDate: value => isDateValid(value) || 'Дата не может быть в будущем',
						},
					},
					initialValues?.datetime?.toString() || date,
				)}
				{renderTextField(
					FormFields.SYSTOLIC,
					'АД сист.',
					'number',
					FormFields.SYSTOLIC,
					{
						min: {
							value: 0,
							message: validationMessages.greaterThanZero,
						},
						required: validationMessages.requiredField,
					},
					initialValues?.systolic.toString() || '',
				)}
				{renderTextField(
					FormFields.DIASTOLIC,
					'АД диаст.',
					'number',
					FormFields.DIASTOLIC,
					{
						min: {
							value: 0,
							message: validationMessages.greaterThanZero,
						},
						required: validationMessages.requiredField,
					},
					initialValues?.diastolic.toString() || '',
				)}
				{renderTextField(
					FormFields.HEART_RATE,
					'ЧСС',
					'number',
					FormFields.HEART_RATE,
					{
						min: {
							value: 0,
							message: validationMessages.greaterThanZero,
						},
						required: validationMessages.requiredField,
					},
					initialValues?.heartRate.toString() || '',
				)}
				{renderTextField(
					FormFields.COMPLAINTS,
					'Жалобы',
					'text',
					FormFields.COMPLAINTS,
					{
						minLength: { value: 4, message: validationMessages.minLengthError },
					},
					initialValues?.complaints || '',
				)}
				{renderTextField(
					FormFields.MEDICATIONS,
					'Лекарства',
					'text',
					FormFields.MEDICATIONS,
					{
						minLength: { value: 4, message: validationMessages.minLengthError },
					},
					initialValues?.medications || '',
				)}
			</Stack>
			<Button type='submit' disabled={isDisabledForm} sx={{ alignSelf: 'end', margin: '5px' }}>
				{entryStatus === Status.PENDING ? 'Сохранение...' : 'Сохранить'}
			</Button>
			{isError && <Alert severity='error'>Ошибка. Данные не сохранены</Alert>}
		</form>
	)
}

export default FormJournal

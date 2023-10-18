import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers'
import { TextField, Stack } from '@mui/material'
import { HealthEntry } from 'types/index'

type FormJournalProps = {
	formData: HealthEntry
	onChange: (arg: HealthEntry) => void
}

const FormJournal: React.FC<FormJournalProps> = ({ formData, onChange }) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		onChange({ ...formData, [name]: value })
		console.log(e.target)
	}
	return (
		<form>
			<Stack spacing={2}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<MobileDateTimePicker
						value={formData.datetime}
						onChange={date => onChange({ ...formData, datetime: date || '' })}
					/>
				</LocalizationProvider>
				<TextField
					name='systolic'
					id='systolic'
					label='АД сист.'
					type='number'
					InputProps={{ inputProps: { min: 0 } }}
					InputLabelProps={{
						shrink: true,
					}}
					onChange={handleInputChange}
				/>
				<TextField
					name='diastolic'
					id='diastolic'
					label='АД диаст.'
					type='number'
					InputProps={{ inputProps: { min: 0 } }}
					InputLabelProps={{
						shrink: true,
					}}
					onChange={handleInputChange}
				/>
				<TextField
					name='heartRate'
					id='heartRate'
					label='ЧСС'
					type='number'
					InputProps={{ inputProps: { min: 0 } }}
					InputLabelProps={{
						shrink: true,
					}}
					onChange={handleInputChange}
				/>
				<TextField
					name='complaints'
					id='complaints'
					label='Жалобы'
					type='text'
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					name='medications'
					id='medications'
					label='Лекарства'
					type='text'
					InputLabelProps={{
						shrink: true,
					}}
					onChange={handleInputChange}
				/>
			</Stack>
		</form>
	)
}

export default FormJournal

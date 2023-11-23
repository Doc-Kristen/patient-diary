import * as React from 'react'
import { useParams } from 'react-router-dom'
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { HealthEntry, HealthJournalProps } from 'types/HealthJournal'
import { columns } from '@helpers/const'
import { useAppDispatch } from '@store/store'
import { deleteJournalEntry, fetchUser } from '@store/userData/asyncActions'
import FormJournal from '@components/FormJournal'
import Modal from '@components/Modal'
import { formatDate } from '@helpers/utils'

const HealthJournal: React.FC<HealthJournalProps> = ({ healthData }) => {
	const dispatch = useAppDispatch()
	const { id } = useParams()
	const userId = id || ''

	const [isOpen, setIsOpen] = React.useState(false)
	const [currentEntry, setcurrentEntry] = React.useState<HealthEntry>()

	const onDeleteEntry = async (rowId: string) => {
		await dispatch(deleteJournalEntry(rowId))
		dispatch(fetchUser(userId))
	}

	const onUpdateEntry = (entry: HealthEntry) => {
		setIsOpen(true)
		setcurrentEntry(entry)
	}

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell
									sx={{ backgroundColor: '#c1c1c1' }}
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{healthData.slice().map((entry, index) => {
							return (
								<TableRow hover role='checkbox' tabIndex={-1} key={index}>
									{columns.map(column => {
										const value = () => {
											if (column.id === 'bloodPressure') {
												return `${entry.systolic} / ${entry.diastolic}`
											}
											if (column.id === 'datetime') {
												return `${formatDate(entry.datetime)}`
											}
											return entry[column.id] as string
										}

										return (
											<TableCell key={column.id} sx={{ textAlign: 'left' }}>
												{column.id === 'edit' && (
													<IconButton onClick={() => onUpdateEntry(entry)}>
														<Edit />
													</IconButton>
												)}
												{column.id === 'delete' && (
													<IconButton onClick={() => onDeleteEntry(entry.id)}>
														<Delete />
													</IconButton>
												)}
												{column.id !== 'edit' && column.id !== 'delete' && value()}
											</TableCell>
										)
									})}
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
			{isOpen && (
				<Modal title='Редактировать запись' isOpen={isOpen} setIsOpen={setIsOpen}>
					<FormJournal setIsOpen={setIsOpen} id={userId} initialValues={currentEntry} />
				</Modal>
			)}
		</Paper>
	)
}

export default HealthJournal

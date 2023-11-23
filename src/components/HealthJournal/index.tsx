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
} from '@mui/material'
import { Edit, Delete, CheckCircleOutline } from '@mui/icons-material'
import { Modal, ActionIconButton, TableRowDetails, FormJournal } from '@components/index'
import { HealthEntry, HealthJournalProps } from 'types/HealthJournal'
import { columns } from '@helpers/const'
import { useAppDispatch } from '@store/store'
import { deleteJournalEntry, fetchUser } from '@store/userData/asyncActions'
import { formatDate } from '@helpers/utils'

const HealthJournal: React.FC<HealthJournalProps> = ({ healthData }) => {
	const dispatch = useAppDispatch()
	const { id } = useParams()
	const userId = id || ''

	// Появление/скрытие модального окна приредактировании
	const [isOpen, setIsOpen] = React.useState(false)

	// Выбор определенной записи
	const [currentEntry, setcurrentEntry] = React.useState<HealthEntry>()

	// Открытие/закрытие аккордеона
	const [openStates, setOpenStates] = React.useState<{ [key: string]: boolean }>({})

	const toggleOpenState = (entryId: string) => {
		setOpenStates(prevState => ({
			...prevState,
			[entryId]: !prevState[entryId],
		}))
	}

	// Удаление записи
	const onDeleteEntry = async (rowId: string) => {
		await dispatch(deleteJournalEntry(rowId))
		dispatch(fetchUser(userId))
	}

	// Редактирование записи
	const onUpdateEntry = (entry: HealthEntry) => {
		setIsOpen(true)
		setcurrentEntry(entry)
	}

	// Определяет формат, в котором будут показаны записи в колонках
	const formatColumnValue = (columnId: string, entry: HealthEntry) => {
		if (columnId === 'bloodPressure') {
			return `${entry.systolic} / ${entry.diastolic}`
		}
		if (columnId === 'datetime') {
			return formatDate(entry.datetime)
		}
		if (columnId === 'complaints' || columnId === 'medications') {
			return entry[columnId] ? (
				<ActionIconButton
					title='Есть запись, нажмите для просмотра'
					icon={CheckCircleOutline}
					onClick={() => {
						toggleOpenState(entry.id)
					}}
				/>
			) : (
				''
			)
		}
		return entry[columnId] as string
	}

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell
									sx={{ backgroundColor: '#c1c1c1', textAlign: 'center' }}
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{healthData.map(entry => {
							return (
								<React.Fragment key={entry.id}>
									<TableRow hover role='checkbox' tabIndex={-1}>
										{columns.map(column => {
											return (
												<TableCell key={column.id} sx={{ textAlign: 'center' }}>
													{column.id === 'edit' && (
														<ActionIconButton
															title='Редактировать'
															icon={Edit}
															onClick={() => onUpdateEntry(entry)}
														/>
													)}
													{column.id === 'delete' && (
														<ActionIconButton
															title='Удалить'
															icon={Delete}
															onClick={() => onDeleteEntry(entry.id)}
														/>
													)}
													{column.id !== 'edit' &&
														column.id !== 'delete' &&
														formatColumnValue(column.id, entry)}
												</TableCell>
											)
										})}
									</TableRow>
									<TableRowDetails entry={entry} open={openStates[entry.id]} />
								</React.Fragment>
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

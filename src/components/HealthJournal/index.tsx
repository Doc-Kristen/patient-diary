import * as React from 'react'
import { HealthEntry } from 'types/index'
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material'

type HealthJournalProps = {
	healthData: HealthEntry[]
}

interface Column {
	id: string
	label: string
	minWidth?: number
	align?: 'center'
}

const columns: readonly Column[] = [
	{ id: 'datetime', label: 'Дата' },
	{
		id: 'bloodPressure',
		label: 'АД (мм.рт.ст)',
	},
	{
		id: 'heartRate',
		label: 'ЧСС (уд/мин)',
	},
	{
		id: 'complaints',
		label: 'Жалобы',
	},
]

const HealthJournal: React.FC<HealthJournalProps> = ({ healthData }) => {
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(10)

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
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
						{healthData
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {
								return (
									<TableRow hover role='checkbox' tabIndex={-1} key={index}>
										{columns.map(column => {
											const isbloodPressure = column.id === 'bloodPressure'
											const formatedBloodPressure = `${row.systolic} / ${row.diastolic}`
											const value = isbloodPressure
												? formatedBloodPressure
												: (row[column.id] as string)
											return <TableCell key={column.id}>{value}</TableCell>
										})}
									</TableRow>
								)
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component='div'
				count={healthData.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				labelRowsPerPage={'Выводить по:'}
			/>
		</Paper>
	)
}

export default HealthJournal

import * as React from 'react'

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
import { HealthJournalProps } from 'types/HealthJournal'
import { columns } from '@helpers/const'

const HealthJournal: React.FC<HealthJournalProps> = ({ healthData }) => {
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
						{healthData.slice().map((row, index) => {
							return (
								<TableRow hover role='checkbox' tabIndex={-1} key={index}>
									{columns.map(column => {
										const value =
											column.id === 'bloodPressure'
												? `${row.systolic} / ${row.diastolic}`
												: (row[column.id] as string)
										return (
											<TableCell key={column.id} sx={{ textAlign: 'left' }}>
												{column.id === 'edit' && (
													<IconButton>
														<Edit />
													</IconButton>
												)}
												{column.id === 'delete' && (
													<IconButton>
														<Delete />
													</IconButton>
												)}
												{column.id !== 'edit' && column.id !== 'delete' && value}
											</TableCell>
										)
									})}
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	)
}

export default HealthJournal

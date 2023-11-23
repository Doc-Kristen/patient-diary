import { HealthEntry } from 'types/HealthJournal'
import React from 'react'
import { Box, Collapse, TableCell, TableRow } from '@mui/material'

type TableRowDetailsProps = {
	entry: HealthEntry
	open: boolean
}

const TableRowDetails: React.FC<TableRowDetailsProps> = ({ entry, open }) => {
	return (
		<TableRow>
			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
				<Collapse in={open ?? false} timeout='auto' unmountOnExit>
					<Box margin={1}>Лекарства: {entry.medications || 'нет'}</Box>
					<Box margin={1}>Жалобы: {entry.complaints || 'нет'}</Box>
				</Collapse>
			</TableCell>
		</TableRow>
	)
}

export default TableRowDetails

import React from 'react'
import { HealthJournal } from '@components/index'
import { healthData } from '@utils/mock'
import { Container } from '@mui/material'

const Patient: React.FC = () => {
	return (
		<Container
			sx={{
				p: 2,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '10px',
				justifyContent: 'center',
			}}>
			<HealthJournal healthData={healthData} />
		</Container>
	)
}

export default Patient

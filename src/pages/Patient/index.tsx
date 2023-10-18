import React from 'react'
import { HealthJournal } from '@components/index'
import { Container } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectJournal} from '@store/journal/selectors'
import { Status } from '@utils/const'
import { useAppDispatch } from '@store/store'
import { fetchJournal } from '@store/journal/asyncActions'

const Patient: React.FC = () => {
	const dispatch = useAppDispatch();
	const { data, status } = useSelector(selectJournal)

	React.useEffect(() => {
		dispatch(fetchJournal())
	}, [dispatch])

	if (status === Status.LOADING) {
		return <div>Loading...</div>
	}

	if (status === Status.ERROR) {
		return <div>Ошибка загрузки</div>
	}
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
			<HealthJournal healthData={data} />
		</Container>
	)
}

export default Patient

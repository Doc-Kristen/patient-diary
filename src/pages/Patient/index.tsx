import React from 'react'
import { useParams } from 'react-router-dom'
import { FormJournal, HealthJournal, Modal, Spinner } from '@components/index'
import { Button, Container, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectJournal, selectDataStatus } from '@store/userData/selectors'
import { Status } from '@helpers/const'
import { useAppDispatch } from '@store/store'
import { fetchUser } from '@store/userData/asyncActions'

const Patient: React.FC = () => {
	const dispatch = useAppDispatch()
	const { id } = useParams()
	const userId = id || ''

	const data = useSelector(selectJournal)

	const status = useSelector(selectDataStatus)

	const [isOpen, setIsOpen] = React.useState(false)
	const handleOpen = () => setIsOpen(true)

	React.useEffect(() => {
		dispatch(fetchUser(userId))
	}, [dispatch, id, userId])

	if (status === Status.PENDING) {
		return <Spinner/>
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
			{data.length > 0 ? (
				<HealthJournal healthData={data} />
			) : (
				<Typography>
					Сохраненные записи не найдены. Добавьте запись, чтобы начать вести дневник.
				</Typography>
			)}
			{isOpen && (
				<Modal title='Добавить запись' isOpen={isOpen} setIsOpen={setIsOpen}>
					<FormJournal setIsOpen={setIsOpen} id={userId} />
				</Modal>
			)}
			<Button variant='contained' onClick={handleOpen}>
				Добавить запись
			</Button>
		</Container>
	)
}

export default Patient

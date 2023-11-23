import dayjs, { Dayjs } from 'dayjs'

export const isDateValid = (dateString: string | number | Date) => {
	const date = new Date(dateString)
	return !isNaN(date.getTime()) && date <= new Date()
}

export const formatDate = (date: string | number | Date | Dayjs) => {
	const formattedDate = dayjs(date).format('DD.MM.YY, HH:mm')
	return formattedDate
}

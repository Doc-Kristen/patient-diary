export const isDateValid = (dateString: string | number | Date) => {
	const date = new Date(dateString)
	return !isNaN(date.getTime()) && date <= new Date()
}

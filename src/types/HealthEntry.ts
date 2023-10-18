import { Dayjs } from 'dayjs'

type HealthEntry = {
	datetime: string | Dayjs
	systolic: number
	diastolic: number
	heartRate: number
	medications?: string
	complaints?: string
	[key: string]: string | number | Dayjs | undefined
}

export default HealthEntry

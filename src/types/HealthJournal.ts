import { Dayjs } from 'dayjs'

export type HealthEntry = {
	id: string
	datetime: string | Dayjs
	systolic: number
	diastolic: number
	heartRate: number
	medications?: string
	complaints?: string
	[key: string]: string | number | Dayjs | undefined
}

export type HealthJournalProps = {
	healthData: HealthEntry[]
}

export interface IColumn {
	id: string
	label: string
	minWidth?: number
	align?: 'center'
}

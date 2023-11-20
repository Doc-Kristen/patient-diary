import { HealthEntry } from './HealthJournal'

export type UserSignIn = {
	email: string
	password: string
	remember?: boolean
}

export type User = {
	firstName?: string
	lastName?: string
	birthday?: string
	email: string
	password: string
}

export type UserData = {
	firstName?: string
	lastName?: string
	birthday?: string
	email: string
	journal: HealthEntry[]
	banned?: boolean
}

export type UserAuth = {
	accessToken: string
	userId: number
}

export type ServerMessage = {
	message: string
}

export type AuthResponse = {
	isAuthenticated: true
}

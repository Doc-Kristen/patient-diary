export type UserSignIn = {
	email: string
	password: string
	remember?: boolean
}

export type User = {
	firstName: string
	lastName: string
	birthday: string
	email: string
	password: string
}

export type UserAuth = {
	accessToken: string
	userId: number
}

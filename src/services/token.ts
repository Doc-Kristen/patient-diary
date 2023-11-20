export type Token = string

export const getToken = (authToken: Token): Token => {
	const token = localStorage.getItem(authToken)
	return token ?? ''
}

export const saveToken = (token: Token): void => {
	localStorage.setItem('token', token)
}

export const dropToken = (): void => {
	localStorage.removeItem('token')
}

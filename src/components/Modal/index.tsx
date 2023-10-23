import React from 'react'
import { styled } from '@mui/material/styles'
import { DialogTitle, DialogContent, IconButton, Dialog } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(3),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}))

type ModalProps = {
	title?: string
	children: React.ReactNode
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
}

const Modal: React.FC<ModalProps> = ({ children, title = '', isOpen, setIsOpen }) => {
	// const [open, setOpen] = React.useState(isOpen)

	const handleClose = () => {
		setIsOpen(false)
	}

	return (
		<BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={isOpen}>
			<DialogTitle sx={{ m: 2, p: 2 }} id='customized-dialog-title'>
				{title}
			</DialogTitle>
			<IconButton
				aria-label='close'
				onClick={handleClose}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: theme => theme.palette.grey[500],
				}}>
				<CloseIcon />
			</IconButton>
			<DialogContent dividers>{children}</DialogContent>
		</BootstrapDialog>
	)
}

export default Modal

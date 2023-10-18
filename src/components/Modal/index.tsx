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
}

const Modal: React.FC<ModalProps> = ({ children, title = '' }) => {
	const [open, setOpen] = React.useState(true)

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
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

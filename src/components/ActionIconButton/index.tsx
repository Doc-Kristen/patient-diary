import { SvgIconComponent } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

type ActionIconButtonProps = {
	title: string
	icon: SvgIconComponent
	onClick: () => void
}

const ActionIconButton: React.FC<ActionIconButtonProps> = ({ title, icon: Icon, onClick }) => {
	return (
		<Tooltip title={title}>
			<IconButton onClick={onClick}>
				<Icon />
			</IconButton>
		</Tooltip>
	)
}

export default ActionIconButton

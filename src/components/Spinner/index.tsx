import { Box } from '@mui/material'
import Lottie from 'lottie-react'
import React from 'react'
import groovyWalkAnimation from './spinner-animation.json'

const Spinner: React.FC = () => {
	return (
		<Box
			sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
			}}>
			<Lottie animationData={groovyWalkAnimation} loop={true} />
		</Box>
	)
}

export default Spinner

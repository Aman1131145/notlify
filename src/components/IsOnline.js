import { CloudDone } from '@mui/icons-material'
import { Box, Chip } from '@mui/material'
import React from 'react'
import { pulse } from '../assets/Animations'

function IsOnline() {
    return (
        <Box
            sx={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', gap: 2 }}
        >
            <Chip
            icon={<CloudDone/>}
            label={'Online'}
            sx={{
                animation: `${pulse} 2s infinite`,
                backdropFilter: 'blur(12px)',
                bgcolor: 'lightgreen',
                color: 'black'
            }}
            />
        </Box>
    )
}

export default IsOnline
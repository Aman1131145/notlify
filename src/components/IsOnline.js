import { CloudDone, CloudOff } from '@mui/icons-material'
import { Box, Chip } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { pulse } from '../assets/Animations'
import { colors } from '../theme/colors'

function IsOnline() {
    const [isOnline, setIsOnline] = useState(navigator.onLine)

    useEffect(() => {
        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    return (
        <Box
            sx={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', gap: 2 }}
        >
            <Chip
                icon={isOnline ? <CloudDone /> : <CloudOff />}
                label={isOnline ? 'Online' : 'Offline'}
                sx={{
                    animation: isOnline ? `${pulse} 2s infinite` : 'none',
                    backdropFilter: 'blur(12px)',
                    bgcolor: isOnline ? colors.status.online : colors.status.offline,
                    color: colors.text.primary
                }}
            />
        </Box>
    )
}

export default IsOnline
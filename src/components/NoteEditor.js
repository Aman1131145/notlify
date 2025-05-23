import { Box, IconButton, Paper } from '@mui/material'
import React from 'react'
import { slideIn } from '../assets/Animations'

function NoteEditor({onClose}) {
    return (
        <Paper
            sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                animation: `${slideIn} 0.3s ease-out`,
                background: 'yellow',
                backdropFilter: 'blur(1rem)',
                borderRadius: '1rem',
                boxShadow: `0 0.75rem 1.5rem black`
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 3,
                    background: 'aqua',
                    p: 2,
                    borderRadius: '0.75rem',
                    color: 'black'
                }}
            >
                <IconButton
                    onClick={onClose}
                >

                </IconButton>
            </Box>
        </Paper>
    )
}

export default NoteEditor
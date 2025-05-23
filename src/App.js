import React from 'react'
import { Box, Container, Paper } from '@mui/material'
import NoteList from './components/NoteList'
import IsOnline from './components/IsOnline'
import { colors } from './theme/colors'

function App() {
    return (
        <Box sx={{
            minHeight: '100vh',
            width: '100%',
            background: colors.background.default,
        }}>
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
                <Paper sx={{
                    p: 3,
                    borderRadius: '24px',
                    background: colors.background.paper,
                    backdropFilter: 'blur(24px)',
                    border: `1px solid ${colors.ui.border}`,
                    boxShadow: `0 16px 48px ${colors.ui.hover}`,
                }}>
                    <NoteList />
                    <IsOnline />
                </Paper>
            </Container>
        </Box>
    )
}

export default App
import { Box, Button, Paper, TextField } from '@mui/material'
import { Add, Search } from '@mui/icons-material'
import React, { useState } from 'react'
import { colors } from '../theme/colors'

function SearchNote({ search, createNote, searchTerm, setSearchTerm }) {
    return (
        <Box sx={{ mb: 4 }}>
            <Paper
                sx={{
                    p: 2,
                    borderRadius: '1rem',
                    background: colors.components.searchBar.background,
                    backdropFilter: 'blur(1rem)',
                    boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.1)',
                    border: `1px solid ${colors.components.searchBar.border}`
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center'
                    }}
                >
                    <TextField
                        fullWidth
                        variant='outlined'
                        placeholder='Search notes...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <Search sx={{ color: colors.text.secondary }} />,
                            sx: {
                                borderRadius: '0.75rem',
                                bgcolor: colors.background.paper,
                                '& fieldset': { border: 'none' },
                                '& input': {
                                    color: colors.text.primary
                                }
                            }
                        }}
                    />
                    <Button
                        variant='contained'
                        startIcon={<Add />}
                        onClick={createNote}
                        sx={{
                            borderRadius: '0.75rem',
                            px: 4,
                            py: 1.5,
                            background: colors.primary.main,
                            boxShadow: '0 0.25rem 1rem rgba(0,0,0,0.1)',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 0.4rem 1rem rgba(0,0,0,0.2)',
                                background: colors.primary.dark
                            },
                            transition: 'all 0.2s',
                            fontWeight: 'bold',
                            color: colors.background.paper
                        }}
                    >
                        New Note
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default SearchNote
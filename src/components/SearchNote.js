import { Box, Button, Paper, TextField } from '@mui/material'
import { Add, Search } from '@mui/icons-material'
import React, { useState } from 'react'

function SearchNote({search, createNote}) {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <Box sx={{ mb: 4 }}>
            <Paper
                sx={{
                    p: 2,
                    borderRadius: '1rem',
                    background: 'red',
                    backdropFilter: 'blur(1rem)',
                    boxShadow: '0 0.5rem 1rem black',
                    border: '1px solid black'
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
                        placeholder='Search notes'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <Search sx={{ color: 'black' }} />,
                            sx: {
                                borderRadius: '0.75 rem',
                                bgcolor: 'white',
                                '& fieldset': { border: 'none' },
                                '& input': {
                                    color: 'black'
                                }
                            }
                        }}
                    />
                    <Button
                        variant='contained'
                        startIcon={<Add />}
                        onClick={createNote}
                    >
                        New Note
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default SearchNote
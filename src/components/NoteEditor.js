import { Box, Button, IconButton, Paper, TextField } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { slideIn } from '../assets/Animations'
import { ArrowBack } from '@mui/icons-material';
import db from '../utils/db'

function NoteEditor({ note, onClose, onDelete, onSave, isNewNote }) {
    console.log('NoteEditor rendered with note:', note);
    const [title, setTitle] = useState(note?.title || '');
    const [content, setContent] = useState(note?.content || '');
    const [selectedTab, setSelectedTab] = useState('write');
    const [saveStatus, setSaveStatus] = useState({ show: false, message: '', severity: 'success' })

    useEffect(() => {
        console.log('NoteEditor useEffect triggered with note:', note);
        if (note) {
            setTitle(note.title || '');
            setContent(note.content || '');
        }
    }, [note])

    const saveNote = useCallback(async (newTitle, newContent) => {
        if (!newTitle.trim() && !newContent.trim()) {
            return;
        }
        try {
            await db.notes.update(note.id, {
                title: newTitle || 'Untitled Note',
                content: newContent,
                updatedAt: new Date().toISOString(),
                syncStatus: 'unsynced'
            });
            setSaveStatus({
                show: true,
                message: 'Note saved successfully',
                severity: 'success'
            });
            onSave?.();
        } catch (error) {
            console.error('Error saving note:', error);
            setSaveStatus({
                show: true,
                message: 'Failed to save note',
                severity: 'error'
            });
        }
    }, [note.id, onSave])

    const handleSave = () => {
        console.log('Saving note with title:', title, 'content:', content);
        saveNote(title, content);
    }
    const handleCloseSnackbar = () => setSaveStatus(prev => ({
        ...prev,
        show: false
    }))
    const handleDelete = () => isNewNote ? onClose() : onDelete(note.id);
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
                    sx={{ color: 'blue' }}
                >
                    <ArrowBack />
                </IconButton>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        color="primary"
                    >
                        Save
                    </Button>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '0.75rem',
                            bgcolor: 'white',
                            '& fieldset': { border: 'none' },
                            '& input': { color: 'black' }
                        }
                    }}
                />
                <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    placeholder="Write your note here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    sx={{
                        flexGrow: 1,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '0.75rem',
                            bgcolor: 'white',
                            '& fieldset': { border: 'none' },
                            '& textarea': { color: 'black' }
                        }
                    }}
                />
            </Box>
        </Paper>
    )
}

export default NoteEditor
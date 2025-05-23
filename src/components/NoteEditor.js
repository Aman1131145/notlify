import { Alert, Box, Button, IconButton, Paper, Snackbar, TextField } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { slideIn } from '../assets/Animations'
import { ArrowBack, Close, Delete, Save } from '@mui/icons-material';
import db from '../utils/db'
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';

function NoteEditor({ note, onClose, onDelete, onSave, isNewNote }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTab, setSelectedTab] = useState('write');
    const [saveStatus, setSaveStatus] = useState({ show: false, message: '', severity: 'success' })

    useEffect(() => {
        if (note) {
            setTitle(note.title || '');
            setContent(note.content || '');
        }
    }, [note])

    const saveNote = useCallback(async (newTitle, newContent) => {
        if (!newTitle.trim() && !newContent.trim()) {
            setSaveStatus({
                show: true,
                message: 'Please fill all the fields',
                severity: 'error'
            });
            return;
        }
        try {
            const updates = {
                title: newTitle.trim(),
                content: newContent.trim(),
                updatedAt: new Date().toISOString(),
                syncStatus: navigator.onLine ? 'synced' : 'unsynced'
            };
            if (isNewNote) {
                await db.notes.add({
                    ...note,
                    ...updates
                })
            } else {
                await db.notes.update(note.id, updates);
            }
            setSaveStatus({
                show: true,
                message: 'Note saved successfully',
                severity: 'success'
            });

            setTimeout(() => {
                onSave();
                onClose();
            }, 1000);
        } catch (error) {
            console.error('Error saving note:', error);
            setSaveStatus({
                show: true,
                message: 'Failed to save note',
                severity: 'error'
            });
        }
    }, [note, onSave, onClose, isNewNote])

    const handleSave = () => {
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
                        startIcon={<Save />}
                        onClick={handleSave}
                        variant="contained"
                        sx={{
                            bgcolor: 'purple',
                            color: 'red',
                            '&:hover': { bgcolor: 'blue' },
                            fontWeight: 'bold',
                            borderRadius: '0.5rem',
                            px: 3,
                            transition: 'all 0.2s'
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        startIcon={isNewNote ? <Close /> : <Delete />}
                        onClick={handleDelete}
                        sx={{
                            bgcolor: 'purple',
                            color: 'red',
                            '&:hover': { bgcolor: 'blue' },
                            fontWeight: 'bold',
                            borderRadius: '0.5rem',
                            px: 3,
                            transition: 'all 0.2s'
                        }}
                    >
                        {isNewNote ? 'Cancel' : 'Delete'}
                    </Button>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    fullWidth
                    variant="filled"
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '0.75rem',
                            bgcolor: 'white',
                            fontSize: '2rem',
                            fontWeight: '800',
                            color: 'black',
                            '& before': { borderBottom: 'none' }
                        }
                    }}
                    inputProps={{
                        style: {
                            color: 'black',
                            padding: '1rem'
                        }
                    }}
                />
                <Paper
                    sx={{
                        flex: 1,
                        overflow: 'auto',
                        borderRadius: '0.75rem',
                        border: '2px solid black',
                        '& .react-mde': {
                            border: 'none',
                            '& .mde-header': {
                                bgcolor: 'pink',
                                borderRadius: '0.5rem 0.5rem 0 0',
                                broderbottom: '2px solid black'
                            },
                            '& .mde-tabs button': {
                                transition: 'all 0.2s',
                                color: 'greenyellow',
                                '&:hover': {
                                    color: 'black'
                                },
                                '& .mde-textarea-wrapper textarea': {
                                    padding: '1rem',
                                    fontSize: '1.1rem',
                                    lineHeight: '1.6',
                                    background: 'white',
                                    color: 'black'
                                }
                            }
                        }
                    }}
                >
                    <ReactMde
                        value={content}
                        onChange={setContent}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        generateMarkdownPreview={markdown =>
                            Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
                        }
                        toolbarCommands={[['bold', 'italic', 'header', 'link', 'code', 'unordered-list']]}
                    />
                    
                </Paper>
                <Snackbar
                    open={saveStatus.show}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                >
                    <Alert severity={saveStatus.severity} sx={{width: '100%'}}>
                        {saveStatus.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Paper>
    )
}

export default NoteEditor
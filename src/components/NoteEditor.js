import { Alert, Box, Button, IconButton, Paper, Snackbar, TextField } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { slideIn } from '../assets/Animations'
import { ArrowBack, Close, Delete, Save } from '@mui/icons-material';
import db from '../utils/db'
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import { colors } from '../theme/colors';

function NoteEditor({ note, onClose, onDelete, onSave, isNewNote }) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTab, setSelectedTab] = useState('write');
    const [saveStatus, setSaveStatus] = useState({ show: false, message: '', severity: 'success' })

    useEffect(() => {
        setTitle(note.title);
        setContent(note.content);
    }, [note])

    const saveNote = useCallback(async (newTitle, newContent) => {
        if (!newTitle.trim() || !newContent.trim()) {
            setSaveStatus({
                show: true,
                message: 'Please add a title or content before saving',
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
            console.log('is new note', isNewNote)
            if (isNewNote) {
                await db.notes.add({ ...note, ...updates });
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
    const handleDelete = () => {
        if (isNewNote) {
            onDelete(note.id);
            onClose();
        } else {
            onDelete(note.id);
        }
    };
    return (
        <Paper
            sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                animation: `${slideIn} 0.3s ease-out`,
                background: colors.components.noteEditor.background,
                backdropFilter: 'blur(1rem)',
                borderRadius: '1rem',
                boxShadow: `0 0.75rem 1.5rem ${colors.ui.hover}`
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 3,
                    background: colors.components.noteEditor.header,
                    p: 2,
                    borderRadius: '0.75rem',
                    color: colors.text.primary
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{ color: colors.primary.main }}
                >
                    <ArrowBack />
                </IconButton>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        startIcon={<Save />}
                        onClick={handleSave}
                        variant="contained"
                        sx={{
                            bgcolor: colors.primary.main,
                            color: colors.background.paper,
                            '&:hover': { bgcolor: colors.primary.dark },
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
                            bgcolor: colors.secondary.main,
                            color: colors.background.paper,
                            '&:hover': { bgcolor: colors.secondary.dark },
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
                            bgcolor: colors.background.paper,
                            fontSize: '2rem',
                            fontWeight: '800',
                            color: colors.text.primary,
                            '& before': { borderBottom: 'none' }
                        }
                    }}
                    inputProps={{
                        style: {
                            color: colors.text.primary,
                            padding: '1rem'
                        }
                    }}
                />
                <Paper
                    sx={{
                        flex: 1,
                        overflow: 'auto',
                        borderRadius: '0.75rem',
                        border: `2px solid ${colors.ui.border}`,
                        '& .react-mde': {
                            border: 'none',
                            '& .mde-header': {
                                bgcolor: colors.components.noteEditor.toolbar,
                                borderRadius: '0.5rem 0.5rem 0 0',
                                borderBottom: `2px solid ${colors.ui.border}`,
                                '& button': {
                                    color: colors.text.secondary,
                                    '&:hover': { background: colors.ui.hover }
                                }
                            }, '& .mde-textarea-wrapper textarea': {
                                padding: '1rem!important',
                                fontSize: '1.1rem!important',
                                lineHeight: '1.6!important',
                                background: `${colors.background.paper}!important`,
                                color: `${colors.text.primary}!important`,
                                minHeight: '400px!important'
                            },
                            '& .mde-preview': {
                                padding: '1rem',
                                background: colors.background.paper,
                                '& h1': { color: colors.primary.main },
                                '& code': { background: colors.ui.border }
                            },
                            '& .mde-tabs button': {
                                transition: 'all 0.2s',
                                color: colors.text.secondary,
                                '&:hover': {
                                    color: colors.text.primary
                                },
                                '& .mde-textarea-wrapper textarea': {
                                    padding: '1rem',
                                    fontSize: '1.1rem',
                                    lineHeight: '1.6',
                                    background: colors.background.paper,
                                    color: colors.text.primary
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
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        severity={saveStatus.severity}
                        sx={{
                            width: '100%',
                            bgcolor: saveStatus.severity === 'success' ? colors.status.synced : colors.status.unsynced,
                            color: colors.background.paper
                        }}
                    >
                        {saveStatus.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Paper>
    )
}

export default NoteEditor
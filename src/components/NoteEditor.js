import { Alert, Box, Button, IconButton, Paper, Snackbar, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { slideIn } from '../assets/Animations'
import { ArrowBack, Close, Delete, Save } from '@mui/icons-material';
import db from '../utils/db'
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import { colors } from '../theme/colors';
import 'react-mde/lib/styles/css/react-mde-all.css';

function NoteEditor({ note, onClose, onDelete, onSave, isNewNote }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTab, setSelectedTab] = useState('write');
    const [saveStatus, setSaveStatus] = useState({ show: false, message: '', severity: 'success' });
    const [isDirty, setIsDirty] = useState(false);
    const AUTO_SAVE_DELAY = 2000;

    useEffect(() => {
        setTitle(note.title);
        setContent(note.content);
    }, [note]);

    useEffect(() => {
        if (!isDirty) return;

        const timeoutId = setTimeout(() => {
            saveNote(title, content, true);
        }, AUTO_SAVE_DELAY);

        return () => clearTimeout(timeoutId);
    }, [title, content, isDirty]);

    const saveNote = useCallback(async (newTitle, newContent, isAutoSave = false) => {
        if (!newTitle.trim() && !newContent.trim()) return;

        try {
            const updates = {
                title: newTitle.trim() || 'Untitled Note',
                content: newContent.trim(),
                updatedAt: new Date().toISOString(),
                syncStatus: navigator.onLine ? 'synced' : 'unsynced'
            };

            if (isNewNote) {
                await db.notes.add({ ...note, ...updates });
            } else {
                await db.notes.update(note.id, updates);
            }

            if (!isAutoSave) {
                setSaveStatus({
                    show: true,
                    message: 'Note saved successfully',
                    severity: 'success'
                });
                setTimeout(() => {
                    onSave();
                    onClose();
                }, 1000);
            }
            setIsDirty(false);
        } catch (error) {
            console.error('Error saving note:', error);
            setSaveStatus({
                show: true,
                message: 'Failed to save note',
                severity: 'error'
            });
        }
    }, [note, onSave, onClose, isNewNote]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setIsDirty(true);
    };

    const handleContentChange = (newContent) => {
        setContent(newContent);
        setIsDirty(true);
    };

    const handleSave = () => {
        saveNote(title, content);
    };

    const handleCloseSnackbar = () => setSaveStatus(prev => ({
        ...prev,
        show: false
    }));

    const handleDelete = () => {
        if (isNewNote) {
            onDelete(note.id);
            onClose();
        } else {
            onDelete(note.id);
        }
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                handleSave();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [title, content]);

    return (
        <Paper
            sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                animation: `${slideIn} 0.3s ease-out`,
                background: `linear-gradient(145deg, ${colors.components.noteEditor.background}, ${colors.background.default})`,
                backdropFilter: 'blur(1.25rem)',
                borderRadius: '16px',
                boxShadow: `0 0.5rem 2rem ${colors.ui.hover}33`,
                border: `1px solid ${colors.ui.border}40`
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    background: `linear-gradient(145deg, ${colors.components.noteEditor.header}, ${colors.background.default})`,
                    p: 2,
                    borderRadius: '0.75rem',
                    boxShadow: `0 0.2rem 0.5rem ${colors.ui.hover}15`,
                    border: `1px solid ${colors.ui.border}30`
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: colors.primary.main,
                        '&:hover': {
                            background: `${colors.primary.main}15`,
                            transform: 'translateX(-2px)'
                        },
                        transition: 'all 0.2s ease'
                    }}
                >
                    <ArrowBack />
                </IconButton>

                <Typography variant="h6" sx={{
                    color: colors.text.primary,
                    fontWeight: 600,
                    letterSpacing: '-0.5px',
                    textShadow: `0 2px 4px ${colors.primary.main}20`
                }}>
                    {isNewNote ? 'New Note' : 'Edit Note'}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        startIcon={<Save sx={{ fontSize: '1.1rem' }} />}
                        onClick={handleSave}
                        variant="contained"
                        sx={{
                            bgcolor: colors.primary.main,
                            color: colors.background.paper,
                            '&:hover': {
                                bgcolor: colors.primary.dark,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 4px 12px ${colors.primary.main}40`
                            },
                            fontWeight: 600,
                            borderRadius: '0.75rem',
                            px: 3,
                            py: 1,
                            transition: 'all 0.2s',
                            textTransform: 'none',
                            boxShadow: `0 2px 8px ${colors.primary.main}30`
                        }}
                    >
                        Save Changes
                    </Button>
                    <Button
                        startIcon={isNewNote ?
                            <Close sx={{ fontSize: '1.2rem' }} /> :
                            <Delete sx={{ fontSize: '1.2rem' }} />}
                        onClick={handleDelete}
                        sx={{
                            bgcolor: colors.secondary.main,
                            color: colors.background.paper,
                            '&:hover': {
                                bgcolor: colors.secondary.dark,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 4px 12px ${colors.secondary.main}40`
                            },
                            fontWeight: 600,
                            borderRadius: '0.75rem',
                            px: 3,
                            py: 1,
                            transition: 'all 0.2s',
                            textTransform: 'none',
                            boxShadow: `0 2px 8px ${colors.secondary.main}30`
                        }}
                    >
                        {isNewNote ? 'Discard' : 'Delete Note'}
                    </Button>
                </Box>
            </Box>

            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                overflow: 'hidden'
            }}>
                <TextField
                    fullWidth
                    variant="filled"
                    placeholder="Untitled Note"
                    value={title}
                    onChange={handleTitleChange}
                    sx={{
                        '& .MuiFilledInput-root': {
                            borderRadius: '1rem',
                            bgcolor: `${colors.background.paper}dd`,
                            fontSize: '2.5rem',
                            fontWeight: 800,
                            color: colors.text.primary,
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(8px)',
                            '&:before, &:after': { borderBottom: 'none' },
                            '&:hover': {
                                bgcolor: `${colors.background.paper}99`,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 8px 24px ${colors.primary.main}22`
                            },
                            '&.Mui-focused': {
                                bgcolor: `${colors.background.paper}dd`,
                                boxShadow: `0 8px 32px ${colors.primary.main}33`
                            }
                        }
                    }}
                    inputProps={{
                        style: {
                            color: colors.text.primary,
                            padding: '1.5rem',
                            letterSpacing: '-0.5px',
                            textShadow: `0 2px 4px ${colors.primary.main}11`
                        }
                    }}
                />
                <Paper
                    sx={{
                        width: '100%',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '1.5rem',
                        overflow: 'hidden',
                        boxShadow: `0 12px 48px ${colors.primary.main}13`,
                        background: `linear-gradient(145deg, ${colors.background.paper}87, ${colors.background.paper}60)`,
                        backdropFilter: 'blur(12px)',
                        border: `1px solid ${colors.ui.border}20`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            boxShadow: `0 16px 64px ${colors.primary.main}20`,
                            transform: 'translateY(-2px)'
                        },
                    }}
                >
                    <ReactMde
                        value={content}
                        onChange={handleContentChange}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        generateMarkdownPreview={(markdown) =>
                            Promise.resolve(
                                <Box sx={{
                                    p: 2,
                                    '& h1, & h2, & h3, & h4, & h5, & h6': {
                                        color: colors.text.primary,
                                        fontWeight: 600,
                                        mb: 2,
                                        textShadow: `0 2px 4px ${colors.primary.main}15`
                                    },
                                    '& p': {
                                        color: colors.text.secondary,
                                        lineHeight: 1.6
                                    },
                                    '& code': {
                                        background: `${colors.primary.main}15`,
                                        padding: '0.2em 0.4em',
                                        borderRadius: '0.25rem',
                                        color: colors.primary.main,
                                        fontWeight: 500
                                    },
                                    '& pre': {
                                        background: `${colors.background.paper}dd`,
                                        padding: '1rem',
                                        borderRadius: '0.5rem',
                                        overflow: 'auto',
                                        border: `1px solid ${colors.ui.border}30`,
                                        boxShadow: `0 4px 12px ${colors.primary.main}15`
                                    },
                                    '& blockquote': {
                                        borderLeft: `4px solid ${colors.primary.main}`,
                                        paddingLeft: '1rem',
                                        color: colors.text.secondary,
                                        fontStyle: 'italic',
                                        background: `${colors.primary.main}10`,
                                        borderRadius: '0.25rem',
                                        padding: '0.5rem 1rem'
                                    }
                                }}>
                                    <ReactMarkdown>{markdown}</ReactMarkdown>
                                </Box>
                            )
                        }
                        childProps={{
                            writeButton: {
                                tabIndex: -1,
                            },
                            textArea: {
                                placeholder: "Start typing your content here...",
                                style: {
                                    width: "100%",
                                    heiht: '100%',
                                    resize: "none",
                                    fontFamily: 'inherit',
                                    fontSize: '1rem',
                                    lineHeight: 1.6,
                                    padding: '1rem',
                                    color: colors.text.primary,
                                    background: 'transparent',
                                },
                            },
                        }}
                        toolbarCommands={[
                            ["header", "bold", "italic", "strikethrough"],
                            ["link", "quote", "code"],
                            ["unordered-list", "ordered-list"]
                        ]}
                    />
                </Paper>
            </Box>
            <Snackbar
                open={saveStatus.show}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '0.75rem',
                        boxShadow: `0 4px 12px ${colors.ui.hover}20`
                    }
                }}
            >
                <Alert
                    severity={saveStatus.severity}
                    sx={{
                        width: '100%',
                        bgcolor: saveStatus.severity === 'success' ?
                            colors.status.synced : colors.status.unsynced,
                        color: colors.background.paper,
                        borderRadius: '0.75rem',
                        fontWeight: 500,
                        boxShadow: `0 0.25rem 0.75rem ${colors.ui.hover}20`,
                        '& .MuiAlert-icon': {
                            color: colors.background.paper
                        }
                    }}
                    icon={false}
                >
                    {saveStatus.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
}

export default NoteEditor;
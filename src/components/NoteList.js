import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, Chip, Container, Dialog, Grid, IconButton, Paper, Typography, Zoom } from '@mui/material'
import SearchNote from './SearchNote';
import { CloudDone, CloudOff, Delete } from '@mui/icons-material';
import NoteEditor from './NoteEditor';
import db from '../utils/db';
import { syncNotes } from '../utils/sync';
import { cardHover } from '../assets/Animations';
import { colors } from '../theme/colors';

function NoteList() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null)
    const [isEditorOpen, setIsEditorOpen] = useState(false)
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const updateOnlineStatus = () => setIsOnline(navigator.onLine);
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, [])

    useEffect(() => {
        const handleOnline = async () => {
            await syncNotes(db);
            loadNotes();
        }
        window.addEventListener('online', handleOnline);

        const intervalId = setInterval(async () => {
            if (navigator.onLine) {
                handleOnline();
            }
        }, 300000);

        return () => {
            window.removeEventListener('online', handleOnline);
            clearInterval(intervalId);
        }
    })

    const loadNotes = async () => {
        const allNotes = await db.notes.toArray();
        console.log('Loaded notes:', allNotes);
        setNotes(allNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)))
    }

    useEffect(() => {
        loadNotes();
    }, []);

    const searchNote = () => {

    }

    const createNewNote = async () => {
        const newNote = {
            id: crypto.randomUUID(),
            title: '',
            content: '',
            updatedAt: new Date().toISOString(),
            syncStatus: 'unsynced',
            deleted: false
        };
        setSelectedNote(newNote);
        setIsEditorOpen(true);
        await db.notes.add(newNote);
        setNotes(prev => [
            newNote,
            ...prev
        ]);
        if (navigator.onLine) syncNotes(db).catch(console.error);
    }

    return (
        <Container maxWidth="xl" sx={{
            height: '100%',
            backgroundColor: colors.background.default
        }}>
            <SearchNote
                search={searchNote}
                createNote={() => setIsEditorOpen(true)}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <Grid container spacing={3}>
                {notes.filter(note =>
                    `${note.title} ${note.content}`.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((note, index) => (
                    <Grid item xs={12} sm={6} md={4} key={note.id}>
                        <Zoom in={true} style={{ transitionDelay: `${index * 50}ms` }}>
                            <Card
                                sx={{
                                    background: colors.components.card.background,
                                    border: `1px solid ${colors.components.card.border}`,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '1rem',
                                    backdropFilter: 'blur(1rem)',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        animation: `${cardHover} 0.3s ease-out forwards`,
                                        boxShadow: `0 0.5rem 1rem ${colors.ui.hover}`,
                                        background: colors.components.card.hover
                                    }
                                }}
                            >
                                <CardContent
                                    sx={{
                                        flexGrow: 1,
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        setSelectedNote(note);
                                        setIsEditorOpen(true);
                                    }}
                                >
                                    <Typography
                                        variant='h6'
                                        sx={{
                                            fontWeight: '800',
                                            color: colors.primary.main,
                                            mb: 2
                                        }}
                                    >
                                        {note.title || 'Untitled Note'}
                                    </Typography>
                                    <Typography variant="body2" sx={{
                                        color: colors.text.secondary,
                                        mb: 2,
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical'
                                    }}>
                                        {note.content || 'No content yet...'}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                        {new Date(note.updatedAt).toLocaleString()}
                                    </Typography>
                                </CardContent>
                                <CardActions
                                    sx={{ p: 2, justifyContent: 'space-between' }}
                                >
                                    <Chip
                                        icon={note.syncStatus === 'synced' ? <CloudDone /> : <CloudOff />}
                                        label={note.syncStatus}
                                        size='small'
                                        sx={{
                                            bgcolor: note.syncStatus === 'synced'
                                                ? colors.status.synced
                                                : colors.status.unsynced,
                                            border: `1px solid ${colors.ui.border}`,
                                            color: colors.background.paper
                                        }}
                                    />
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            db.notes.delete(note.id);
                                            setNotes(prev =>
                                                prev.filter(n => n.id !== note.id)
                                            )
                                        }}
                                        color='error'
                                    >
                                        <Delete />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Zoom>
                    </Grid>
                ))}
            </Grid>
            <Dialog
                open={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                maxWidth='md'
                fullWidth
                PaperProps={{
                    sx: {
                        height: '90vh',
                        maxHeight: '90vh',
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        background: colors.background.paper
                    }
                }}
            >
                {selectedNote &&
                    <NoteEditor
                        note={selectedNote}
                        onClose={() => setIsEditorOpen(false)}
                        onDelete={(id) => {
                            db.notes.delete(id);
                            setNotes(prev =>
                                prev.filter(n => n.id !== id)
                            )
                        }}
                        onSave={loadNotes}
                        isNewNote={!notes.some(n => n.id === selectedNote.id)}
                    />
                }
            </Dialog>
        </Container>
    )
}

export default NoteList
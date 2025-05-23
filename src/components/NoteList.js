import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, Chip, Container, Dialog, Grid, IconButton, Paper, Typography, Zoom } from '@mui/material'
import SearchNote from './SearchNote';
import { CloudDone, Delete } from '@mui/icons-material';
import NoteEditor from './NoteEditor';
import db from '../utils/db';
import { syncNotes } from '../utils/sync';

function NoteList() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null)
    const [isEditorOpen, setIsEditorOpen] = useState(false)
    const [isOnline, setIsOnline] = useState(navigator.onLine);

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
            title: 'Untitled Note',
            content: '',
            updatedAt: new Date().toISOString(),
            syncStatus: 'unsynced',
            deleted: false
        };
        console.log('Creating new note:', newNote);
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
            height: '100%'
        }}>
            <SearchNote
                search={searchNote}
                createNote={() => setIsEditorOpen(true)}
            />
            <Grid container spacing={3}>
                {notes.map((note) => (
                    <Grid item xs={12} sm={6} md={4} key={note.id}>
                        <Zoom in={true}>
                            <Card
                                sx={{
                                    background: 'red',
                                    border: '1px solid black',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '1rem',
                                    backdropFilter: 'blur(1rem)',
                                    transition: 'all 0.2s',
                                }}
                            >
                                <CardContent
                                    sx={{
                                        flexGrow: 1,
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        console.log('Opening note:', note);
                                        setSelectedNote(note);
                                        setIsEditorOpen(true);
                                    }}
                                >
                                    <Typography
                                        variant='h6'
                                        sx={{
                                            fontWeight: '800',
                                            background: 'purple',
                                            mb: 2
                                        }}
                                    >
                                        {note.title || 'Untitled Note'}
                                    </Typography>
                                    <Typography variant="body2" sx={{
                                        color: 'yellow',
                                        mb: 2,
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical'
                                    }}>
                                        {note.content || 'No content yet...'}
                                    </Typography>
                                    <Typography variant="caption" sx={{}}>
                                        {new Date(note.updatedAt).toLocaleString()}
                                    </Typography>
                                </CardContent>
                                <CardActions
                                    sx={{ p: 2, justifyContent: 'space-between' }}
                                >
                                    <Chip
                                        icon={<CloudDone />}
                                        label={note.syncStatus || 'synced'}
                                        size='small'
                                        sx={{
                                            bgcolor: 'white',
                                            border: '1px solid black',
                                            color: 'black'
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
                        background: 'white'
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
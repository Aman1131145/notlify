import React, { useState } from 'react'
import { Card, CardActions, CardContent, Chip, Container, Dialog, Grid, IconButton, Paper, Typography, Zoom } from '@mui/material'
import SearchNote from './SearchNote';
import { CloudDone, Delete } from '@mui/icons-material';
import NoteEditor from './NoteEditor';

function NoteList() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null)
    const [isEditorOpen, setIsEditorOpen] = useState(false)

    const searchNote = () => {

    }

    const createNewNote = () => {

    }

    return (
        <Container maxWidth="xl" sx={{
            height: '100%'
        }}>
            <SearchNote
                search={searchNote}
                createNote={createNewNote}
            />
            <Grid container spacing={3}>
                <Grid>
                    <Zoom in={true} style={{}}>
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
                                onclick={() => { 
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
                                    {'Untitled Note'}
                                </Typography>
                                <Typography variant="body2" sx={{
                                    color: 'yellow',
                                    mb: 2,
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical'
                                }}>
                                    {'No content yet...'}
                                </Typography>
                                <Typography variant="caption" sx={{ }}>
                                    {new Date().toLocaleString()}
                                </Typography>
                            </CardContent>
                            <CardActions 
                                sx={{p:2, justifyContent: 'space-between'}}
                            >
                                <Chip
                                    icon={<CloudDone/>}
                                    label={'synced'}
                                    size='small'
                                    sx={{
                                        bgcolor: 'white',
                                        border: '1px solid black',
                                        color: 'black'
                                    }}
                                />
                                <IconButton
                                    onclick={(e) => {}}
                                    color='error'
                                >
                                    <Delete/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Zoom>
                </Grid>
            </Grid>
            <Dialog
                open={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                maxWidth='md'
                fullWidth
                PaperProps={{
                    sx: {
                        height: '90vh',
                        maxHeight:'90vh',
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        background: 'white'
                    }
                }}
            >
                <NoteEditor
                    note={null}
                    onClose={() => setIsEditorOpen(false)}
                    onDelete={(id) => {}}
                    onSave={() => {}}
                    isNewNote={true}
                />
            </Dialog>
        </Container>
    )
}

export default NoteList
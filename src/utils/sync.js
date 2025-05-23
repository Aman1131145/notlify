const API_URL = 'http://localhost:3001/notes';

export async function syncNotes(db) {
    try {
        console.log('Starting sync process...');
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }
        console.log('Fetch response: ', response);
        const serverNotes = await response.json();
        console.log('Server notes: ', serverNotes);

        // Update all unsynced notes to synced status when online
        await db.transaction('rw', db.notes, async () => {
            const unsyncedNotes = await db.notes.where('syncStatus').notEqual('synced').toArray();
            for (const note of unsyncedNotes) {
                await db.notes.update(note.id, { syncStatus: 'synced' });
            }
        })

        await db.transaction('rw', db.notes, async () => {
            for (const serverNote of serverNotes) {
                const localNote = await db.notes.get(serverNote.id);
                if (!localNote) {
                    await db.notes.add({ ...serverNote, syncStatus: 'synced', deleted: false })
                } else if (localNote.syncStatus === 'synced' && new Date(serverNote.updatedAt) > new Date(localNote.updatedAt)) {
                    await db.notes.update(localNote.id, { ...serverNote })
                }
            }
        })

        const locallyDeletedNotes = await db.notes
            .where('deleted').equals(true)
            .and(n => n.syncStatus !== 'synced')
            .toArray();

        for (const note of locallyDeletedNotes) {
            try {
                await fetch(`${API_URL}/${note.id}`, { method: 'DELETE' });
                await db.notes.delete(note.id);
            } catch (error) {
                await db.notes.update(note.id, { syncStatus: 'error' });
            }
        }
    } catch (error) {
        console.error('Sync error: ', error);
    }
}
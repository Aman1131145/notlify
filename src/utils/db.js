import Dexie from 'dexie';

const db = new Dexie('NotesDB');

db.version(1).stores({
    notes: 'id, title, content, updatedAt, syncStatus, deleted'
}).upgrade(tx => {
    return tx.table('notes').toCollection().modify(note => {
        note.deleted= note.deleted || false;
    })
})

export default db;
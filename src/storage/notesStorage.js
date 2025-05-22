import SQLite from 'react-native-sqlite-storage';
import {Platform} from 'react-native';

// Configure SQLite
SQLite.enablePromise(true);

let DB_NAME = 'NotesApp';
let Table_NAME = 'notes';

// Set the location of the database
let location = Platform.OS === 'ios' ? 'Library' : 'default';

let dbInstance = null;

export const initDB = async () => {
  if (dbInstance == null) {
    try {
      dbInstance = await SQLite.openDatabase({name: DB_NAME, location});
      await dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS ${Table_NAME} (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          body TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`,
      );
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  return dbInstance;
};

/**
 * Fetch paginated notes
 * @param {Number} limit - Number of notes per page
 * @param {Number} offset - Number of notes to skip
 */

export const fetchNotes = async ({limit = 10, offset = 0}) => {
  try {
    if (!dbInstance) {
      dbInstance = await initDB();
    }
    const [results] = await dbInstance.executeSql(
      `SELECT * FROM notes ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset],
    );

    const notes = [];
    const rows = results.rows;
    for (let i = 0; i < rows.length; i++) {
      notes.push(rows.item(i));
    }

    return notes;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

/**
 * Insert note
 * @param {Text} id - id of the note
 * @param {Text} title - title of the note
 * @param {Text} body - body of the note
 */

export const insertNote = async ({title, body}) => {
  try {
    if (!dbInstance) {
      dbInstance = await initDB();
    }
    const id = Date.now().toString(); // Generate a unique ID based on the current timestamp
    const [result] = await dbInstance.executeSql(
      `INSERT INTO notes (id, title, body) VALUES (?, ?, ?)`,
      [id, title, body],
    );

    return {
      id,
      title,
      body,
    };
  } catch (error) {
    console.error('Error inserting note:', error);
    throw error;
  }
};

/**
 * Update note
 * @param {Text} id - id of the note
 * @param {Text} title - title of the note
 * @param {Text} body - body of the note
 */

export const updateNote = async ({ id, title, body }) => {
  try {
    if (!dbInstance) {
      dbInstance = await initDB();
    }
    const result = await dbInstance.executeSql(
      `UPDATE notes SET title = ?, body = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [title, body, id]
    );

    // result is an array of result sets, usually for one query
    // In SQLite for React Native, result[0] contains the result info
    const { rowsAffected } = result[0];

    if (rowsAffected === 0) {
      // No row updated => id probably does not exist
      return null; // or throw an error here if you want
    }

    return {
      id,
      title,
      body,
    };
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};


/**
 * Delete note
 * @param {Text} id - id of the note
 */

export const deleteNote = async ({id}) => {
  try {
    if (!dbInstance) {
      dbInstance = await initDB();
    }
    await dbInstance.executeSql(`DELETE FROM notes WHERE id = ?`, [id]);

    return true;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

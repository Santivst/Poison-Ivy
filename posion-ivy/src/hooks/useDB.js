import { Platform } from "react-native";

let SQLite;
if (Platform.OS !== 'web') {
    SQLite = require("expo-sqlite");
}

export const useDB = () => {
    const openDatabase = async () => {
        if (Platform.OS === 'web') {
            console.warn('SQLite no está disponible en la web');
            return null;
        }

        const db = await SQLite.openDatabaseSync("sessions.db");
        return db;
    };

    const initDB = async () => {
        const db = await openDatabase();
        if (!db) return;

        const sql = `CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);`;
        const res = await db.execAsync(sql);
        console.log(res);
        return res;
    };

    const insertSession = async ({ email, localId, token }) => {
        const db = await openDatabase();
        if (!db) return;

        const sql = `INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?);`;
        const args = [localId, email, token];
        const res = await db.runAsync(sql, args);
        console.log(res);
        return res;
    };

    const getSession = async () => {
        const db = await openDatabase();
        if (!db) return;

        const sql = `SELECT * FROM sessions`;
        const firstRow = await db.getFirstAsync(sql);
        console.log(firstRow);
        return firstRow;
    };

    const truncateSessionTable = async () => {
        const db = await openDatabase();
        if (!db) return;

        const sql = `DELETE FROM sessions`;
        const res = await db.execAsync(sql);
        console.log(res);
        return res;
    };

    return {
        initDB,
        insertSession,
        getSession,
        truncateSessionTable,
    };
};

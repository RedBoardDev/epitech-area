import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

class DbManager {
    constructor() {
        this.con = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        this.con.connect((err) => {
            if (err) throw new Error(`Failed to connect to database ${process.env.MYSQL_DATABASE}`);
            console.log('Successfully connected to the database ' + process.env.MYSQL_DATABASE);
        });
    }

    destructor() {
        this.closeConnection();
    }

    closeConnection() {
        this.con.end();
        console.log('Disconnecting from the MySQL database');
    }

    getAllUsers(withPassword = false) {
        const query = `SELECT ${withPassword ? '*' : 'id, email, created_at'} FROM user;`;

        return new Promise((resolve, reject) => {
            this.con.query(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getUserById(id, withPassword = false) {
        const query = `SELECT ${withPassword ? '*' : 'id, email, created_at'} FROM user WHERE id = ?;`;
        const values = [id];

        return new Promise((resolve, reject) => {
            this.con.query(query, values, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getUserByEmail(email, withPassword = false) {
        const query = `SELECT ${withPassword ? '*' : 'id, email, created_at'} FROM user WHERE email = ?;`;
        const values = [email];

        return new Promise((resolve, reject) => {
            this.con.query(query, values, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getUserByEmailOrId(str, withPassword = false) {
        const query = `SELECT ${withPassword ? '*' : 'id, email, created_at'} FROM user WHERE id = ? OR email = ?;`;
        const values = [str, str];

        return new Promise((resolve, reject) => {
            this.con.query(query, values, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    insertUser(email, passwordHash) {
        const query = 'INSERT INTO user(email, password) VALUES (?, ?)';
        const values = [email, passwordHash];

        return new Promise((resolve, reject) => {
            this.con.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    updateUser(id, updateQueryString) {
        const query = `UPDATE user SET ? WHERE id = ?;`;
        const values = [updateQueryString, id];

        return new Promise((resolve, reject) => {
            this.con.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    deleteUser(id) {
        const query = `DELETE FROM user WHERE id = ?;`;
        const values = [id];

        return new Promise((resolve, reject) => {
            this.con.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

export default DbManager;

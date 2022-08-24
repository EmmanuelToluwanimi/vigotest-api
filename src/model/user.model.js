const db = require('../utils/db');

class User {
    constructor(fullname, email, password) {
        this.fullname = fullname;
        this.email = email;
        this.password = password;
    }

    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM users');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async getByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async updateWallet(amount, id) {
        const [rows] = await db.execute('UPDATE users SET wallet = ? WHERE id = ?', [amount, id]);
        return rows[0];
    }

    async save() {
        const [rows] = await db.execute('INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)', [this.fullname, this.email, this.password]);
        return rows.insertId;
    }
}

module.exports = User;
const db = require('../utils/db');

class Transaction {
    constructor({ gift_id, sender_id, receiver_id, status, description, amount, quantity, currency  }){
        this.gift_id = gift_id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.status = status;
        this.description = description;
        this.amount = amount;
        this.quantity = quantity;
        this.currency = currency;
    }

    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM transactions');
        return rows;
    }
    
    static async getById(id) {
        var query = `
            SELECT transactions.*, 
            (
                SELECT users.fullname
                FROM users
                WHERE transactions.sender_id = users.id
            ) AS sender,
            (
                SELECT users.fullname
                FROM users
                WHERE transactions.receiver_id = users.id
            ) AS receiver
            FROM transactions
            JOIN gifts
            ON transactions.gift_id = gifts.id
            WHERE transactions.id = ?
        `;
        const [rows] = await db.execute('SELECT * FROM transactions WHERE id = ?', [id]);
        return rows[0];
    }

    static async getBySenderId(id) {
        const [rows] = await db.execute('SELECT * FROM transactions WHERE sender_id = ?', [id]);
        return rows;
    }

    static async getByReceiverId(id) {
        const [rows] = await db.execute('SELECT * FROM transactions WHERE receiver_id = ?', [id]);
        return rows;
    }

    static async getByUserId(id) {
        var query = `
            SELECT transactions.*,
            (
                SELECT users.fullname
                FROM users
                WHERE transactions.sender_id = users.id
            ) AS sender,
            (
                SELECT users.fullname
                FROM users
                WHERE transactions.receiver_id = users.id
            ) AS receiver
            FROM transactions
            JOIN gifts
            ON transactions.gift_id = gifts.id
            WHERE transactions.sender_id = ?
            OR
            transactions.receiver_id = ?;
        `;
        const [rows] = await db.execute(query, [id]);
        return rows;
    }
    
    async save() {
        const [rows] = await db.execute('INSERT INTO transactions (gift_id, sender_id, receiver_id, status, description, amount, quantity, currency) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [this.gift_id, this.sender_id, this.receiver_id, this.status, this.description, this.amount, this.quantity, this.currency  ]);
        return rows.insertId;
    }
}

module.exports = Transaction;
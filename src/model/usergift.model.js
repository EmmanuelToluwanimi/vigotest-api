const db = require('../utils/db');

class User_gift {
    constructor({ gift_id, sender_id, receiver_id, quantity, currency }){
        this.gift_id = gift_id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.quantity = quantity;
        this.currency = currency;
    }

    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM user-gifts');
        return rows;
    }
    
    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM user-gifts WHERE id = ?', [id]);
        return rows[0];
    }

    static async getBySenderId(id) {
        const [rows] = await db.execute('SELECT * FROM user-gifts WHERE sender_id = ?', [id]);
        return rows;
    }

    static async getByReceiverId(id) {
        const [rows] = await db.execute('SELECT * FROM user-gifts WHERE receiver_id = ?', [id]);
        return rows;
    }

    static async getByUserId(id) {
        const [rows] = await db.execute('SELECT * FROM user-gifts WHERE receiver_id = ? OR sender_id = ?', [id]);
        return rows;
    }
    
    async save() {
        const [rows] = await db.execute('INSERT INTO user-gifts (gift_id, sender_id, receiver_id, quantity, currency) VALUES (?, ?, ?, ?, ?)', [this.gift_id, this.sender_id, this.receiver_id, this.quantity, this.currency ]);
        return rows.insertId;
    }
}

module.exports = User_gift;
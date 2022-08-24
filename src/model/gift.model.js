const db = require('../utils/db');

class Gift {
    constructor({name, amount, imgUrl}){
        this.name = name;
        this.amount = amount;
        this.imgUrl = imgUrl;
    }

    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM gifts');
        return rows;
    }
    
    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM gifts WHERE id = ?', [id]);
        return rows[0];
    }
    
    async save() {
        const [rows] = await db.execute('INSERT INTO gifts (name, amount, imgUrl) VALUES (?, ?, ?)', [this.name, this.amount, this.imgUrl]);
        return rows.insertId;
    }
}

module.exports = Gift;
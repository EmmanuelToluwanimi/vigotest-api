const db = require('../utils/db');

class Like {
    constructor({post_id, user_id}) {
        this.post_id = post_id;
        this.user_id = user_id;
    }
    
    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM likes');
        return rows;
    }
    
    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM likes WHERE id = ?', [id]);
        return rows[0];
    }
    
    static async getByPostId(post_id) {
        var query = `
            SELECT post_id, likes.user_id, users.fullname, users.email
            FROM likes
            JOIN users ON likes.user_id = users.id
            WHERE likes.post_id = ?;
        `;

        const [rows] = await db.execute(query, [post_id]);
        return rows;
    }
    
    static async getByUserId(user_id) {
        const [rows] = await db.execute('SELECT * FROM likes WHERE user_id = ?', [user_id]);
        return rows;
    }

    static async verify(post_id, user_id) {
        const [rows] = await db.execute('SELECT * FROM likes WHERE post_id = ? AND user_id = ?', [post_id, user_id]);
        return rows.length > 0;
    }
    
    async save() {
        const [rows] = await db.execute('INSERT INTO likes (post_id, user_id) VALUES (?, ?)', [this.post_id, this.user_id]);
        return rows.insertId;
    }

    static async delete(post_id, user_id) {
        const [rows] = await db.execute('DELETE FROM likes WHERE post_id = ? AND user_id = ?', [post_id, user_id]);
        return rows.affectedRows;
    }
}

module.exports = Like;
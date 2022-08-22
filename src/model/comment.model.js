const db = require('../utils/db');

class Comment {
    constructor({post_id, user_id, comment}) {
        this.post_id = post_id;
        this.user_id = user_id;
        this.comment = comment;
    }
    
    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM comments');
        return rows;
    }
    
    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM comments WHERE id = ?', [id]);
        return rows[0];
    }
    
    static async getByPostId(post_id) {
        const [rows] = await db.execute('SELECT * FROM comments WHERE post_id = ?', [post_id]);
        return rows;
    }
    
    static async getByUserId(user_id) {
        const [rows] = await db.execute('SELECT * FROM comments WHERE user_id = ?', [user_id]);
        return rows;
    }
    
    async save() {
        const [rows] = await db.execute(
            'INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)', 
            [this.post_id, this.user_id, this.comment]
        );
        return rows.insertId;
    }
}

module.exports = Comment;
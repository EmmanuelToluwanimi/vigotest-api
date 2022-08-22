const db = require('../utils/db');

class Post {
    constructor({imgUrl, description, user_id, allow_comments, allow_giftbag, hide_likes}) {
        this.imgUrl = imgUrl;
        this.description = description;
        this.user_id = user_id;
        this.allow_comments = (allow_comments === 'true');
        this.allow_giftbag = (allow_giftbag === 'true');
        this.hide_likes = (hide_likes === 'true');
    }

    static async getAll() {
        var s = "SELECT po.id, po.imgUrl, po.description, po.user_id, po.allow_giftbag, po.allow_comments, po.hide_likes, users.fullname FROM posts AS po INNER JOIN users ON po.user_id = users.id"
        const [rows] = await db.execute(s);
        return rows;
    }
    
    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM posts WHERE id = ?', [id]);
        return rows[0];
    }
    
    static async getByUserId(user_id) {
        const [rows] = await db.execute('SELECT * FROM posts WHERE user_id = ?', [user_id]);
        return rows;
    }
    
    async save() {
        const [rows] = await db.execute(
            'INSERT INTO posts (imgUrl, description, user_id, allow_comments, allow_giftbag, hide_likes) VALUES (?, ?, ?, ?, ?, ?)', 
            [this.imgUrl, this.description, this.user_id, this.allow_comments, this.allow_giftbag, this.hide_likes]
        );
        return rows.insertId;
    }
}

module.exports = Post;
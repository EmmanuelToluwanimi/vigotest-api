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
        var s = "SELECT posts.id, posts.imgUrl, posts.description, posts.user_id, posts.allow_giftbag, posts.allow_comments, posts.hide_likes, users.fullname FROM posts INNER JOIN users ON posts.user_id = users.id"
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
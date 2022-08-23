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
        var query = `
            SELECT posts.id, imgUrl, description, posts.user_id, allow_comments, allow_giftbag, hide_likes, users.fullname, users.email, posts.created_at,
            (SELECT COUNT(post_id) FROM likes WHERE likes.post_id = posts.id) AS total_likes,
            (SELECT COUNT(post_id) FROM comments WHERE comments.post_id = posts.id) AS total_comments
            FROM posts
            JOIN users 
            ON posts.user_id = users.id
        `;

        const [rows] = await db.execute(query);
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
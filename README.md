# Vigotest

This is an assessment task by Vigoplace for the role of fullstack engineer. This task is mainly to showcase mysql raw queries coupled with nodejs to create rest endpoints.

## Usage
You can try to clone.
or test with endpoint url.

## Url
Base Url: `https://vigotest.herokuapp.com/`

## Endpoints
The project contains api endpoints for the following operations:
1. Check if the server is running : `GET /api/healthcheck` - `{fullname, email, password}`
2. Add a new user : `POST /api/auth/signup` - `{email, password}`
3. Login a user : `POST /api/auth/login`
4. Create post with formdata : `POST /api/posts` - `{imgUrl: file, description, allow_comments: bool, allow_giftbag: bool, hide_likes: bool}`
5. Get all posts : `GET /api/posts`
6. Get single post : `GET /api/posts/:id`
7. Like a post : `POST /api/posts/:id/like`
8. Get likes of a post : `GET /api/posts/:id/likes`
9. Unlike a post : `DELETE /api/posts/:id/unlike`
10. Get all user posts : `GET /api/posts/:id/user`
11. Comment on a post : `POST /api/posts/:id/comments` - `{ comment }`
12. Get post comments : `GET /api/posts/:id/comments`
13. Get all gifts: `GET /api/system/gifts`
14. Get single gift : `GET /api/system/gifts/:id`
15. Gift users : `GET /api/user/gifts` - `{ gift_id, receiver_id, quantity, currency: "usd" || "euro" || "naira" }`
16. Get all gifts received : `GET /api/user/gifts`
17. Get all transactions : `GET /api/user/transactions`
18. Get single transaction: `GET /api/user/transactions/:id`
    
The project is still in progress. Feel free to test.
Thank you.

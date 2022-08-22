# Vigotest

This is an assessment task by Vigoplace for the role of fullstack engineer. This task is mainly to showcase mysql raw queries coupled with nodejs to create rest endpoints.

## Usage
You can try to clone.
or test with endpoint url.

## Url
Base Url: `https://vigoapi.herokuapp.com/api`

## Endpoints
The project contains api endpoints for the following operations:
1. Check if the server is running : `GET /api/healthcheck`
2. Add a new user : `POST /api/auth/signup`
3. Login a user : `POST /api/auth/login`
4. Create post with formdata : `POST /api/posts`
5. Get all posts : `GET /api/posts`
6. Get single post : `GET /api/posts/:id`
7. Like a post : `POST /api/posts/:id/like`
8. Get likes of a post : `GET /api/posts/:id/likes`
9. Unlike a post : `DELETE /api/posts/:id/unlike`
10. Get all user posts : `GET /api/posts/:id/user`
11. Comment on a post : `POST /api/posts/comments`
    
The project is still in progress. Feel free to test.
Thank you.
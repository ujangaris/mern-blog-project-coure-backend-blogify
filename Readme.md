# BACKEND blogify

## Bagian 11: Post And Comment Controller Backend

### Create Post Controller

    Todo:
    1.  controllers/posts/postsController.js
        - import dan pasang express-async-handler
        - import dan pasang model Category
        - import dan pasang model Post
        - import dan pasang model User
        - Get the payload
        - check if post exists
        - create post
        - Associate post to user
        - Push post into category
        - send the response success(201)
    2.  routes/post/postsRouter.js
        - import dan pasang express
        - import dan pasang isLoggin
        - import dan pasang createPost dari postsControler
        - create post
            method: post,
            pasang isLoggin sebagai middleware,
            pasang postsRouter,
        - exports postsRouter

    4.  server.js
        - import dan pasang postsRouter
        - buat enpoint categories (pasang postsRouter)
    5.  pengujian pada postman:
        - Login dulu
            POST http://localhost:9080/api/v1/users/login
        - POST http://localhost:9080/api/v1/categories
            copy id category lalu paste di inputan posts
        - POST http://localhost:9080/api/v1/posts
            Authorization: Bearer Token, kemudian pastekan access_token setelah login
            body :{
                    "title":"Why Mern",
                    "content":"some content",
                    "categoryId":"64d49e37d07a62ad8e4de61e"
                  }

        - hasil response:
            {
                "status": "success",
                "message": "Post Successfully Created",
                "post": {
                    "title": "Why Mern2",
                    "image": "",
                    "claps": 0,
                    "content": "some content",
                    "author": "64d346f07777a0c05b525563",
                    "shares": 0,
                    "postViews": 0,
                    "category": "64d49e37d07a62ad8e4de61e",
                    "scheduledPublished": null,
                    "likes": [],
                    "disLikes": [],
                    "comments": [],
                    "_id": "64d4d25a9fd1d8f6554e3604",
                    "createdAt": "2023-08-10T12:04:42.831Z",
                    "updatedAt": "2023-08-10T12:04:42.831Z",
                    "__v": 0
                }
            }

        - jika create post dengan title yang sama responsenya:
            {
                "status": "failed",
                "message": "Post Why Mern already exists",
                "stack": "Error: Post Why Mern already exists\n    at D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\controllers\\posts\\postsController.js:15:11\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)"
            }

        - jika create tanpa login/access_token responsenya:
            {
                "status": "failed",
                "message": "token expired/Invalid",
                "stack": "Error: token expired/Invalid\n    at D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\middlewares\\isLoggin.js:20:19\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)"
            }

### Get All Post Controller

    Todo:
    1.  controllers/posts/postsController.js
        - getPosts
        - send the response succes(200)
    2.  routes/post/postsRouter.js
        - import dan pasang getPosts dari postsController
    3.  pengujian pada postman:
        - POST http://localhost:9080/api/v1/posts
        - hasil response:
            akan menampilkan semua data post

### Get single Post Controller

    Todo:
    1.  controllers/posts/postsController.js
        - getPost
        - send the response succes(200)
    2.  routes/post/postsRouter.js
        - import dan pasang getPost dari postsController
    3.  pengujian pada postman:

        - POST http://localhost:9080/api/v1/posts/<id post>
        - hasil response:
            akan menampilkan semua data post

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
            akan menampilkan satu data post

### Update & Delete Post Controller

    Todo:
    1.  controllers/posts/postsController.js
        - updatePost
        - asyncHandler()
        - findByIdAndUpdate()
        - send the response succes(200)

        - deletePost
        - asyncHandler()
        - findByIdAndDelete()
        - send the response succes(200)

    2.  routes/post/postsRouter.js
        - import dan pasang updatePost dari postsController
          Methods: put('/:id)
          isLoggin
        - import dan pasang deletePost dari postsController
          Methods: delete('/:id)
          isLoggin
    3.  pengujian pada postman:
        - login terlebih dulu dengan user terdaftar
             POST http://localhost:9080/api/v1/users/login
        - masuk ke get all post
            POST http://localhost:9080/api/v1/posts
            - copy id dari salah satu post
        - update post
            PUT http://localhost:9080/api/v1/posts/<id post>
            Authorization: Bearer Token, kemudian pastekan access_token setelah login
            body :{
                    "title":"NodeJs",
                  }
        - hasil response: success(200)

        - delete post
            DELETE http://localhost:9080/api/v1/posts/<id post>
        - hasil response: success(200)
            data akan terhapus

### fleksible token to postman

    Todo:
    1.  pada postman
        POST http://localhost:9080/api/v1/users/login
        => test : pm.environment.set("token", pm.response.json().token)
        ket:
        - parameter pertama nanti yang akan di panggil
        - parameter kedua adalah hasil response dari database

### Create Comment Controller and Populate Post comment

    Todo:
    1.  controllers/comments/commentsController.js
        - import dan pasang asyncHandler
        - import pasang Comment model
        - import pasang Post model
        - exports.createComment
        - get the payload
        - get postId from params
        - createComment
        - Associate comment to a post
        - send the response(201)
    2.  model/comments/Comment.js
        - rubah field text menjadi message
    3.  routes/comments/commentRouter.js
        - import dan pasang express
        - import dan pasang isLoggin
        - import dan pasang createComment dari comentController
        - create comment
        export commentRouter
    4.  server.js
        - buat enpoint untuk comments
        - import dan pasang commentRouter
    5.  untuk menampilkan comment pada post
        - conttrollers/posts/postController.js
            - pasang populate yang membungkus field comments
    6.  pengujian pada postman
        - login terlebih dahulu dengan user teerdaftar
            - POST http://localhost:9080/api/v1/users/login
        - request data all post, untuk memilih id post
            - POST http://localhost:9080/api/v1/posts
        - create comment
            - POST {{baseURL}}/comments/<postId>
            - Authorization -> Bearer Token -> {token}
              ini token sudah fleksibel jika login baru otomatis terpanggil(karna sudah di setting token fleksible)
            - body -> row -> json:
            {
                "message": "Wow..."
            }
        - hasil response: success(201)
        - buka pada request all post field comments akan terisi
            POST http://localhost:9080/api/v1/posts

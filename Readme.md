# BACKEND blogify

## Bagian 9: Post Categories API Backend

### Create Category and Modified isLogin Middleware

    Todo:
    1.  controllers/categories/categoryController.js
        - import dan pasang express-async-handler
        - import dan pasang model Category
        - create category
        - if exist
        - response fromat json
    2.  routes/category/categoryRouter.js
        - import dan pasang express
        - import dan pasang isLoggin
        - create category
            method: post,
            pasang isLoggin sebagai middleware,
            pasang categoryRouter,
        - exports categoryRouter
    3.  middlewares/isLoggin.js
        - perbaiki error jika token tidak ada atau expired
    4.  server.js
        - import dan pasang categoryRouter
        - buat enpoint categories (pasang categoryRouter)
    5.  pengujian pada postman:
        - Login dulu
            POST http://localhost:9080/api/v1/users/login

        -POST http://localhost:9080/api/v1/categories
            Authorization: Bearer Token, kemudian pastekan access_token setelah login
            body :{
                "name": "NodeJs",
            }

        - hasil response:
            {
                "status": "success",
                "message": "Category successfully cerated",
                "category": {
                    "name": "PHP",
                    "author": "64d346f07777a0c05b525563",
                    "shares": 0,
                    "_id": "64d49e37d07a62ad8e4de61e",
                    "createdAt": "2023-08-10T08:22:15.378Z",
                    "updatedAt": "2023-08-10T08:22:15.378Z",
                    "__v": 0
                }
            }

        - jika create categories dengan name yang sama responsenya:
            {
                "status": "failed",
                "message": "Category already exists",
                "stack": "Error: Category already exists\n    at D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\controllers\\categories\\categoryController.js:12:11\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)"
            }

        - jika create tanpa login/access_token responsenya:
            {
                "status": "failed",
                "message": "token expired/Invalid",
                "stack": "Error: token expired/Invalid\n    at D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\middlewares\\isLoggin.js:20:19\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)"
            }

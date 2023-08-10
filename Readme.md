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

### Fetch All Categories

    Todo:
    1.  controllers/categories/categoryController.js
        - getCategories()
          duplikat code dari createCategory kemudian modifikasi, rubah juga response statusnya menjadi 200
    2.  routes/category/categoryRouter.js
        - all category
          karna public tidak perlu menggunakan middleware dari isLoggin
    3.  pengujian pada postman:
        - login dan tidak login bisaa access enpoint ini
        -GET http://localhost:9080/api/v1/categories
        - hasil response:
            semua data category akan tampil

### Delete and Update Category

    Todo:
    1.  controllers/categories/categoryController.js
        - deleteCategory()
          duplikat code dari createCategory kemudian modifikasi, rubah juga response statusnya menjadi 200
        - findByIdAndDelete(req.params.id)

        - updateCategory()
          duplikat code dari createCategory kemudian modifikasi, rubah juga response statusnya menjadi 200
        - findByIdAndUpdate(req.params.id)
    2.  routes/category/categoryRouter.js
        - update category
            - import dan pasang updateCategory
            - pasang juga isLoggin
            - method put dan tambahkan parameter :id
        - delete category
            - import dan pasang deleteCategory
            - pasang juga isLoggin
            - method delete dan tambahkan parameter :id
    3.  pengujian pada postman:
        - login dulu dan copy access_token, kemudian  pada Authorization, pilih bearer token lalu pastekan access_token
        -PUT http://localhost:9080/api/v1/categories/<id dari category>
        body -> row -> json:
        {
            "name":"NodeJS & Express"
        }
        - hasil response:
            {
                "status": "success",
                "message": "Categories successfully deleted",
                "category": {
                    "_id": "64d49b1ad07a62ad8e4de618",
                    "name": "NodeJS & Express",
                    "author": "64d346f07777a0c05b525563",
                    "shares": 0,
                    "createdAt": "2023-08-10T08:08:58.655Z",
                    "updatedAt": "2023-08-10T08:53:23.943Z",
                    "__v": 0
                }
            }

        -DELETE http://localhost:9080/api/v1/categories/<id dari category>
        - hasil response:
            {
                "status": "success",
                "message": "Categories successfully deleted"
            }

## Bagian 10: Postman Confirguration Backend

### Environment Variables in NodeJs(dotenv)

    Todo:
    1.  install dotenv
        - npm i dotenv
    2.  server.js
        - import dan pasang dotenv
    3.  .env
        - MOGO_URL=mongodb://localhost:27017/mern-blog
        - JWT_KEY=<isi dengan token yang diiginkan>
    4.  config/database.js
        - panggil nama database yang sudah di deklarasikan pada file .env
          pada kasus ini:  MOGO_URL
    5.  utils/generateToken.js
        - panggil nama key yang sudah di deklarasikan pada file .env
          pada kasus ini:  JWT_KEY
    6.  middlewares/isLoggin.js
        - panggil nama key yang sudah di deklarasikan pada file .env
          pada kasus ini:  JWT_KEY

    7.  pengujian pada postman:
        - login dulu dan copy access_token, kemudian  pada Authorization, pilih bearer token lalu pastekan access_token
        - coba semua endpoint
        - harusnya semua akan berjalan tanpa masalah.

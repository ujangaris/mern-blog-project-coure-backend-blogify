# BACKEND blogify

## Bagian 6: Data Modelling Backend

### User Data modelling

    Todo:
    1.  model/User/User.js

### Post Data modelling

    Todo:
    1.  model/Post/Post.js

### Category & Comment Data modelling

    Todo:
    1.  model/Category/Category.js
    2.  model/Comment/Comment.js

## Bagian 7: Authentication & Authorisation Backend

### Dummy User Registration Controller

    Todo:
    1.  controllers/users/usersController.js
    2.  routes/users/usersRouter.js
    3.  server.js
    4.  pengujian dengan postman:
        - POST http://localhost:9080/api/v1/users/register
        - klik send, hasil response:
            {
                "message": "user registration controller"
            }

### Connect to MongoDB database

    Todo:
    1.  config/daatabase.js
    2.  server.js
        - import dan pasang connectDB
    3.  buat database pada mongodb:
        - link:
            https://cloud.mongodb.com/v2/64d22831baaeba6a2738e4a6#/clusters
    4.  jalankan server:
        - npm start
        - jika ada text pada terminal : DB has been connected
        - menandakan setup yang kita lakukan berhasil

### Installing Nodemon & VSCODE MongoDB Extension

    Todo:
    1.  install Nodemon
        - npm i nodemon -D
    2.  pasang extension MongoDB pada VSCODE
        - pada extension vscode cari MongoDB for VS Code
          kemudian install
        - nanti ada logo daun , kemudian klik lalu klik connect
        - copy connection string yang ada pada file config/database
          lalu enter, jika ada notif mongodb connecting successfully
          tanda nya mongo db berhasil di connect dengan vscode.

### User Registration

    Todo:
    1.  controllers/users/usersController.js
        - import dan pasang User model
        - get the details
        - Check if user exists
        - Register new user
        - save
        - cetak response success dan gagal
    2.  server.js
        - middlewares
          ini berfungsi untuk memberi memastikan bahwa data JSON yang masuk dalam body
          permintaan akan di-parse dan diubah menjadi objek JavaScript yang dapat diakses melalui req.body
    3.  model/User.js
        - ubah required isVerified menjadi false
    4.  jalankan server:
        - npm run server
    5.  pengujian pada postman:
        - POST http://localhost:9080/api/v1/users/register
        body -> row -> json:
            {
                "username":"aris",
                "email":"aris@gmail.com",
                "password":"12345"
            }
        - jika berhasil , response akan menampilkan data dan status (201)

### Has User Password

    Todo:
    1.  Install bcryptjs
        - npm i bcryptjs
    2.  controllers/users/usersController.js
        - import dan pasang bcrypt
          ini berfungsi untuk memperkuat keamanan password pengguna,
          jadi password pengguna tidak terlihat langsung, namun di acak dengan algoritma hash bcrypt.
        - has password
    3.  config/database.js
        - ubah connection string ke local mongodb database
        - ubah juga connection pada vscodenya!
        - untuk lebih yakin nyalakan mongodb compas dan liat isi database mern-blog
          akan ada databa yang kita registrasikan.
    4.  pengujian pada postman:
        - POST http://localhost:9080/api/v1/users/register
        body -> row -> json:
            {
                "username":"aris2",
                "email":"aris@gmail.com",
                "password": "$2a$10$7tZlqJg/7cb.cHBKjdt/8eYF4kJfeKwCv0iU3WxuixVCR3be21GMe",
            }
        - jika berhasil , response akan menampilkan data dan status (201)
        - dapat dilihat password asli tidak tampil, namun akan tampil random string, number, atau special character

### Login User

    Todo:
    1.  controllers/users/usersController.js
        - Login user
        - get teh login details
        - Check if exists
        - compare the hashed password with the one the request
        - Update  the last login
        - save user untuk perubahan lastLogin
    2.  routes/users/usersRouter.js
        - Login
        - import dan pasang login controller

    4.  pengujian pada postman:
        - POST http://localhost:9080/api/v1/users/login
        body -> row -> json:
            {
                "username":"aris2",
                "password": "12345",
            }
        - jika berhasil , response akan menampilkan data dan status "success"
        - namun pada bagian ini status dari response belum ditangani, jd status masih bernilai 200(ok)

### Generate Token

    Todo:
    1.  install jsonwebtoken
        - npm i jsonwebtoken
    2.  utils/generateToken.js
        - import dan pasang jwtwebtoken
        - create payload for the user
        - sign the token with  a secret key
        - export generateToken
    3.  controllers/users/usersController.js
        - import dan pasang generateToken
        - haspus user & tampilkan response yang ingin ditampilkan saja
    4.  pengujian pada postman:
        - POST http://localhost:9080/api/v1/users/login
        body -> row -> json:
            {
                "username":"aris2",
                "password": "12345",
            }
        - jika berhasil , response akan menampilkan data dan status "success":
            {
                "status": "success",
                "_id": "64d346f07777a0c05b525563",
                "email": "aris2@gmail.com",
                "username": "aris2",
                "role": "user",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkMzQ2ZjA3Nzc3YTBjMDViNTI1NTYzIn0sImlhdCI6MTY5MTU3NDAzNywiZXhwIjoxNjkxNjEwMDM3fQ.XFLwTEdbHlCdtDSIqjl6P3CD9OAjqXDEFRHBT6B556s"
            }
        - namun pada bagian ini status dari response belum ditangani, jd status masih bernilai 200(ok)

### Dummy Profile Controller

    Todo:
    1.  controllers/users/usersController.js
        - Get profile
        - hanya menampilkan pesan Profile fetched
    2.  routes/users/usersRouter.js
        - import dan pasang getProfile
        - buat route profile
        - agar lebih rapih ubah base_url pindahkan ke server.js
    3.  server.js
        - hanya merubah base_url
    4.  pengujian pada postman:
        - GET http://localhost:9080/api/v1/users/profile/<isi sembarang huruf/angka>

        - jika berhasil , response akan menampilkan data dan status "success":
            {
                "status": "success",
                "message": "Profile fetched",
                "data": "user data"
            }
        - namun pada bagian ini status dari response belum ditangani, jd status masih bernilai 200(ok)

### is Login Middleware Logic Implementation

    Todo:
    1.  middlewares/isLoggin.js
        - implementasi dengan next()
          next berfungsi ketika code dijalankan masuk kethap berikutnya, agar tidak load lama.
    2.  routes/users/usersRouter.js
        - import dan pasang isLoggin
    3.  pengujian pada postman:
        - GET http://localhost:9080/api/v1/users/profile/<isi sembarang huruf/angka>

        - jika berhasil , response akan menampilkan data dan status "success":
            {
                "status": "success",
                "message": "Profile fetched",
                "data": "user data"
            }
        - pada terminal akan ada message isLoggin middleware

### Get token from Request Header

    Todo:
    1.  middlewares/isLoggin.js
        - implementasi untuk mengambil nilai token dari headers
    2.  pengujian pada postman:
        - GET http://localhost:9080/api/v1/users/profile/<isi sembarang huruf/angka>

        - jika berhasil , response akan menampilkan data dan status "success":
            {
                "status": "success",
                "message": "Profile fetched",
                "data": "user data"
            }
        - pada terminal akan ada token yang tampil

### Verify Token

    Todo:
    1.  middlewares/isLoggin.js
        - import dan pasang jsonwebtoken
        - implementation Verify the token
    2.  pengujian pada postman:
        - GET http://localhost:9080/api/v1/users/profile/<isi sembarang huruf/angka>

        - jika berhasil , response akan menampilkan data dan status "success":
            {
                "status": "success",
                "message": "Profile fetched",
                "data": "user data"
            }
        - pada terminal akan  tampil:
            {
                user: { id: '64d346f07777a0c05b525563' },
                iat: 1691575926,
                exp: 1691611926
            }

### Save User into Request Object

    Todo:
    1.  middlewares/isLoggin.js
        - import dan pasang user model
        - get the user id
        - dengan select tampilkan data user yang ingin ditampilkan
        - save user into req obj
    2.  controllers/users/usersController.js
        - cetak response yangg tampil pada consol.log
        - console.log(req.userAuth);
          userAuth ini dipanggil dari isLoggin
    3.  pengujian pada postman:
        - GET http://localhost:9080/api/v1/users/profile/<isi sembarang huruf/angka>

        - jika berhasil , response akan menampilkan data dan status "success":
            {
                "status": "success",
                "message": "Profile fetched",
                "data": "user data"
            }
        - pada terminal akan  tampil:
            {
                _id: new ObjectId("64d346f07777a0c05b525563"),
                username: 'test2',
                email: 'test@gmail.com',
                role: 'user'
            }

### Get User Profile Controller Improved (tampilkan data user berdasarkan id)

    Todo:

    1.  controllers/users/usersController.js
        - get user id from params
    2.  pengujian pada postman:
        - GET http://localhost:9080/api/v1/users/profile/<isi id user yang login>

        - jika berhasil , response akan menampilkan data dan status "success":
        - sluruh data user tampil sama dengan yang di terminal
        - pada terminal data user akan  tampil

### Get User Profile Controller Improved 2 (tampilkan data user tanpa id)

    Todo:

    1.  controllers/users/usersController.js
        - get user id from params
        - console.log(req.userAuth._id);
    2.  routes/users/usersRouter.js
        - kosongkan nilai dari id
    3.  pengujian pada postman:(kosongkan nilai dari id)
        - GET http://localhost:9080/api/v1/users/profile/

        - harusnya error namun , response akan menampilkan data dan status "success":
        - sluruh data user tampil
        - pada kasus ini harusnya response error,
        - akan kita handle pada step berikutnya!

## Bagian 8: Error Handling Backend

### Global Error Handler Middleware

    Todo:

    1.  controllers/users/usersController.js
        - getProfile
        - triger custom
        - tambahkan next pada properti async
    2.  server.js
        - Error Middleware
    3.  pengujian pada postman:(kosongkan nilai dari id)
        - GET http://localhost:9080/api/v1/users/profile/
        - status, message, stack
        - hasil response akan menampilkan custome error yang kita buat:
        {
            "status": "failed",
            "message": "my custom error",
            "stack": "Error: my custom error\n    at exports.getProfile (D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\controllers\\users\\usersController.js:95:17)\n    at Layer.handle [as handle_request] (D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\route.js:144:13)\n    at D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\middlewares\\isLoggin.js:24:7\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)"
        }

### Catch Async Errors

    Todo:

    1.  install express async hanlder
        - npm i express-async-handler
    2.  controllers/users/usersController.js
        - import dan pasang express async handler
        - hapus try catch dan bungkus code dari callback function async sampai breket penutup code
          dengan asyncHandler lakukan pada register, login & getProfile
    3.  pengujian pada postman:
        - POST http://localhost:9080/api/v1/users/register
        - send data dengan user yang sudah terdaftar agar bisa menampilkan pesan erroronya:
        body -> row -> json:
            {
                "username":"aris",
                "email":"aris@gmail.com",
                "password":"12345"
            }
        - status, message, stack
        - hasil response akan menampilkan  errodengan asyncHandler :
        {
            "status": "failed",
            "message": "User aris already exists",
            "stack": "Error: User aris already exists\n    at D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\controllers\\users\\usersController.js:18:11\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)"
        }

### NotFound Handler

    Todo:

    1.  server.js
        - Not Found middleware
    2.  pengujian pada postman:
        - POST http://localhost:9080/api/v1/users/register/<isi dengan apas saja>
        - POST http://localhost:9080/api/v1/users/login/<isi dengan apas saja>
        - GET http://localhost:9080/api/v1/users/profile/<isi dengan id yang tidak terfaftar>
        - coba satu2 request endpoint diatas, kemudian send
        - hasil response akan menampilkan  errodengan asyncHandler :
        {
            "status": "failed",
            "message": "Cannot find  /api/v1/users/login/dsadsa on the server",
            "stack": "Error: Cannot find  /api/v1/users/login/dsadsa on the server\n    at D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\server.js:16:15\n    at Layer.handle [as handle_request] (D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at trim_prefix (D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\index.js:328:13)\n    at D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\index.js:286:9\n    at Function.process_params (D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\index.js:346:12)\n    at next (D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\index.js:280:10)\n    at D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\index.js:646:15\n    at next (D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\index.js:265:14)\n    at Function.handle (D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\index.js:175:3)\n    at router (D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\index.js:47:12)"
        }

### Refactored Error Handlers

    Todo:

    1.  middleware/globalErrorHandler.js
        - globalErrorHandler
        - notFound
        - export globalErrorHandler & notFound
    2.  server.js
        - modifikasi code Not Found middleware & Error Middleware
        - import dan pasang globalErrorHandler & notFound
    3.  pengujian pada postman:
        - POST http://localhost:9080/api/v1/users/register/<isi dengan apas saja>
        - POST http://localhost:9080/api/v1/users/login/<isi dengan apas saja>
        - GET http://localhost:9080/api/v1/users/profile/<isi dengan id yang tidak terfaftar>
        - coba satu2 request endpoint diatas, kemudian send
        - hasil response akan menampilkan  error dengan globalErrorHandler & notFond :
        {
            "status": "failed",
            "message": "Cannot find  /api/v1/users/login/dsadsa on the server",
            "stack": "Error: Cannot find  /api/v1/users/login/dsadsa on the server\n    at D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\server.js:16:15\n    at Layer.handle [as handle_request] (D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at trim_prefix (D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\index.js:328:13)\n    at D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\index.js:286:9\n    at Function.process_params (D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\index.js:346:12)\n    at next (D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\index.js:280:10)\n    at D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\index.js:646:15\n    at next (D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\index.js:265:14)\n    at Function.handle (D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\index.js:175:3)\n    at router (D:\\BELAJAR\\REACTJS\\UDEMY\\blogify\\api\\node_modules\\express\\lib\\router\\index.js:47:12)"
        }

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

### Update & Delete Comment

    Todo:
    1.  controllers/comments/commentsController.js
        - update comment
            - exports.updateComment
            - findByIdAndUpdate
            - send the response(200)
        - delete comment
            - exports.deleteComment
            - findByIdAndDelete
            - send the response(200)

    2.  routes/comments/commentRouter.js
        - update comment
            - import dan pasang updateComment
            - Method: put('/:id)
            - pasang isLoggin
        - delete comment
            - import dan pasang deleteComment
            - Method: delete('/:id)
            - pasang isLoggin

    3.  pengujian pada postman
        - login terlebih dahulu dengan user teerdaftar
            - POST {{baseURL}}/api/v1/users/login
        - request data all post, untuk memilih id comment
            - POST {{baseURL}}/api/v1/posts
        - update comment
            - POST {{baseURL}}/comments/<comment Id>
            - Authorization -> Bearer Token -> {token}
              ini token sudah fleksibel jika login baru otomatis terpanggil(karna sudah di setting token fleksible)
            - body -> row -> json:
            {
                "message": "update comment"
            }
        - hasil response: success(200)

        - delete comment
            - POST {{baseURL}}/comments/<comment Id>
        - hasil response: success(200), dan data akan terhapus
        - noted: {{baseURL}} ini digunakan karna sudah di setup environment variable pada postman

## Bagian 12: Blocking & Unblocking, Following & Unfollowing Controllers Backend

### Blocking User Controller

    Todo:
    1.  controllers/posts/postsController.js
        - exports.blockUser
        - pasang asyncHandler
        - Find the user to be blocked
        - user who isblocking
        - check if user is blockung him/herself
        - check if the user already blocked
        - push the user to be blocked in the array of the current user
        - response code(200)
    2.  routes/users/usersRouter.js
        - import dan pasang blokUser dari usersController
        - block user
        - method:put('/block/:userIdToBlock)
        - pasang isLoggin
        - pasang blockUser
    3.  pengujian pada postman
        - daftarkan akun yang mau diblok dengan cara register data baru, ini untuk mengambil id user tersebut
            POST {{baseURL}}/users/register
        - lalu login dengan user kita
            POST {{baseURL}}/users/login
        - blok user
            PUT {{baseURL}}/users/<id user yang ingin di block>
        - hasil response : success(200)
        - kemudian liat pada profile:
            GET {{baseURL}}/users/profile
            - akan ada id user yang terblock:
                 "blockedUsers": [
                    "64d600f5a07ac3182c7f69e3"
                ],

### Unblocking User Controller

    Todo:
    1.  controllers/posts/postsController.js
        - exports.unblockUser
        - pasang asyncHandler
        - find the current user
        - check if user is blocked before unblocking
        - remove the user from current user blocked users array
        - resave the current user
        - response code(200)
    2.  routes/users/usersRouter.js
        - import dan pasang unblokUser dari usersController
        - block user
        - method:put('/unblock/:userIdToUnBlock)
        - pasang isLoggin
        - pasang unblockUser
    3.  pengujian pada postman
        -  login dengan user kita
            POST {{baseURL}}/users/login
        - kemudian liat pada profile:
            GET {{baseURL}}/users/profile
            - disini copy id user yang di block
        - blok user
            PUT {{baseURL}}/users/<id user yang ingin di unblock>
        - hasil response : success(200)
        - kemudian liat pada profile:
            GET {{baseURL}}/users/profile
            - user dengan id yang kit apilih sudah terhapus:
                 "blockedUsers": [],

### Who view My Profile Controller

    Todo:
    1.  controllers/posts/postsController.js
        - exports.profileViewers
        - pasang asyncHandler
        - Find that w want to view his profile
        - find the current user
        - check if the user already view the profile
        - push the current user id into the user profile
        - response code(200)
    2.  routes/users/usersRouter.js
        - import dan pasang profileViewers dari usersController
        - profile viewers
        - method:get('/profile-viewer/:userProfileId)
        - pasang isLoggin
        - pasang profileViewers
    3.  pengujian pada postman
        - daftarkan akun yang mau diblok dengan cara register data baru, ini untuk mengambil id user tersebut
            POST {{baseURL}}/users/register
        -  login dengan user kita
            POST {{baseURL}}/users/login
        - kemudian liat profile view
            GET {{baseURL}}/users/profile-viewer/<id user yang ingin diliat/ yang barusaja didaftarkan>
        - response akan menampilkan success(200)
        - jika request response dengan id yang sama akan menampilkan:
            "You have already viewed this profile"
        - lalu  login dengan user yang baru saja diliat
        - kemudian liat get profile:
            GET {{baseURL}}/users/profile
            - pada profileViewers akan ada id user yang meliat profilenya

### User Following Controller

    Todo:
    1.  controllers/posts/postsController.js
        - exports.followingUser
        - pasang asyncHandler
        - find the current user
        - Avoid user following himself
        - push the userToFollowId into the current user following field
        - push the currentUserId into the user to follow followers field
        - response code(200)
    2.  routes/users/usersRouter.js
        - import dan pasang followingUser dari usersController
        - following
        - method:put('/following/:userToFollowId')
        - pasang isLoggin
        - pasang followingUser
    3.  models/Users/User.js
        - tambahkan field following
    4.  pengujian pada postman
        - daftarkan akun yang mau diblok dengan cara register data baru, ini untuk mengambil id user tersebut
            POST {{baseURL}}/users/register
        -  login dengan user kita
            POST {{baseURL}}/users/login
        - kemudian request followingUser
            PUT {{baseURL}}/users/following/<id user yang ingin difollow/ ini yang barusaja didaftarkan biar mudah>
        - response akan menampilkan success(200)
        - kemudian liat get profile:
            GET {{baseURL}}/users/profile
            - pada following akan ada id user yang kita follow
        - noted jika login dengan user yang di follow
          pada field followers akan ada id user yang memfollow td

### Unfollow User Controller

    Todo:
    1.  controllers/posts/postsController.js
        - exports.unFollowingUser
        - pasang asyncHandler
        - find the user to unfollow
        - Avoid user unfollowing himself
        - remove the userToUnFollowId from the current user following field
        - remove the currentUserId from  the user to unfollow followers field
        - response code(200)
    2.  routes/users/usersRouter.js
        - import dan pasang unFollowingUser dari usersController
        - unfollowing
        - method:put('/unfollowing/:userToUnFollowId')
        - pasang isLoggin
        - pasang unFollowingUser
    4.  pengujian pada postman
        -  login dengan user yang ada following nya
            POST {{baseURL}}/users/login
        - kemudian request get profile
            POST {{baseURL}}/users/profile
            - ambil salah satu id dari field following
        - kemudian request unFollowingUser
            PUT {{baseURL}}/users/following/<id user yang ingin di unfollow>
        - response akan menampilkan success(200)
        - kemudian liat get profile:
            GET {{baseURL}}/users/profile
            - pada following akan terhapus id yang kita unfollow
        - noted jika login dengan user yang di unfollow
          pada field followers akan terhapus id user yang memfollow

## Bagian 13: Forgot & Password Reset || Backend

### Email Sending Using Nodemailer & Password for Gmail Account

    Todo:
    1.  install nodemailer
        - npm install nodemailer
    2.  gmail account
        - pada profile gmail klik poto profile
        - kemudian pilih manage your Google Account
        - security -> pada How you sign in to Google
          pilih 2-step Verification on sice >
        - akan diarahkan untuk login kembali, silahkan login
        - lalu scroll kebawah , pada App passwords
        - pada select app pilih other custome name , namakan blogify, kemudian klik generate
        - copy token dibawah Your app password for your device(pasang pada file .env)
    3.  .env
        - password
        - user email pengirim/use email address
    4.  utils/sendEmail.js
        - import dan pasang nodemailer
        - create transport
        - create msg
        - send the email
        - remove the userToUnFollowId from the current user following field
        - remove the currentUserId from  the user to unfollow followers field
        - response code(200)
    5.  server.js
        - import dan pasang sendEmail
        - pasang dotenv sebagai configuration
        - sendEmail untuk pasarameter pertama email penerima
        - sendEmail untuk pasarameter kedua email pesan
    6.  pengujian pada postman
        - restart ulang server
        - pada terminal akan ada : Email sent <9911afea-95f0-3b82-7904-d3f1ef48e01a@localhost>
        - periksa email yang kita daftarkan pada file server.js
        - akan ada pesan masuk dari ujangaja@gmail.com yang didalamnya terdapat link reset password

### Forgot Password Controller

    Todo:
    1.  model/User.js
        - Generate password reset token
        - import dan pasang crypto package
        - generate token
        - Assign the token to passwordResetToken field
        - update the passwordResetExpires and when to expire
    2.  controllers/users/usersController.js
        - npm exports.forgotPassword
        - Find the email in our db
        - Create token
        - resave the user
        - send email message
        - import dan pasang sendEmail
        - pada sendEmail :
            - parameter pertama adalah inputan email yang dimasukan pada body di postman
            - parameter kedua adalah token yang sudah digenerate
        - response (200)
    3.  server.js
        - hapus yang berhubungan dengan sendEmail karna, sendEmail akan di pasang di usersController
    4.  routes/users/usersRouter.js
        - forgot password
        - method:post('/forgot-password')
        - import dan pasang forgotPassword
    3.  pengujian pada postman
        - restart ulang server
        - POST {{baseURL}}/users/forgot-password
        - body -> row -> json:
            {

                "email":"arisandiujang@gmail.com"
            }
        - noted: email pada body harus terdaftar pada aplikasi dan email asli yang dapat menerimapesan email
        - response akan menampilkan : "message": "Password Reset email sent"

        - pada terminal akan ada :
            Server is running on port 9080
            DB has been connected
            a3b6b3b9f6f977680df5591d70a512b0ca8d3ae2
            Email sent <bba73082-1470-5a76-d67e-90c4dc807de9@localhost>
        - periksa email yang kita input pada forgot-password
        - akan ada pesan masuk dari ujangaja@gmail.com yang didalamnya terdapat link reset password

### Reset Password Controller

    Todo:
    1.  controllers/users/usersController.js
        - exports.resetPassword
        - Get the id/token from email /params
        - Convert the token to actual token that has been  saved in the db
        - find the user by the crypto token
        - response (200)
    2.  routes/users/usersRouter.js
        - reset password
        - method:post('/reset-password/:resetToken')
        - import dan pasang resetPassword
    3.  pengujian pada postman
        - restart ulang server
        - periksa email yang kita input pada forgot-password
        - akan ada pesan masuk dari ujangaja@gmail.com yang didalamnya terdapat
          link reset password(ini pakai inbox lama gpp karna expired satu hari)
        - klik link pada email, kemudian copy token yang terdapat pada path url  reset password
        - POST {{baseURL}}/users/reset-password/<pastekan token yang  telah dicopy pada path url reset password>
        - body -> row -> json:
            {

                "email":"arisandiujang@gmail.com"
            }
        - noted: email pada body harus email yang kita input pada forgot password
        - response akan menampilkan data user dan pada passwordResetToken terisi token,
          yang mengindikasikan setup yang kita lakukan berhasil:
            "passwordResetToken": "2fdd355981c6d3cd4159060cdff5a97472f2de4c60b482bc9630bdfb710a7935"
        - nilai dari passwordResetToken isinya akan sama dengan yang berada di postman,  database dan console.log
        - pada terminal akan ada :
            Server is running on port 9080
            DB has been connected
            2fdd355981c6d3cd4159060cdff5a97472f2de4c60b482bc9630bdfb710a7935

### Reset Password Controller | update password

    Todo:
    1.  controllers/users/usersController.js
        - pada exports.forgotPassword di response tambahkan resetToken
        - pada exports.resetPassword
            - passwordResetExpires
            - pasang kondisi jika passwordResetToken & passwordResetExpires tidak ditemukan.
              (userFound berisi kan data passwordResetToken & passwordResetExpires )
            - Update the user password
            - reset the user
            - response (200)
    2.  pengujian pada postman
        - POST {{baseURL}}/users/forgot-password
        - body -> row -> json:
            {

                "email":"arisandiujang@gmail.com"
            }
        - pada response copy isi resetToken
        - POST {{baseURL}}/users/reset-password/<pastekan resetToken yang  telah dicopy >
        - body -> row -> json:
            {

                "email":"arisandiujang@gmail.com",
                "password":"1234",
            }
        - noted: email pada body harus email yang kita input pada forgot password
        - response akan menampilkan :  "message": "Password reset successfully"
        - nilai dari passwordResetToken isinya akan sama dengan yang berada di postman,  database dan console.log
        - pada terminal akan ada :
            Server is running on port 9080
            DB has been connected
            2fdd355981c6d3cd4159060cdff5a97472f2de4c60b482bc9630bdfb710a7935

        - sekarang coba login dengan email yang baru saja di reset passwordnya
        - noted: gunakan password baru yakni : 1234
        - jika setup yang dilakukan benar , maka login dengan password baru berhasil

        - tambahan jika diperhatikan pada proses forgot-password,
            passwordResetToken & passwordResetExpires akan terisi
          namun ketika masuk proses reset-password,
            passwordResetToken & passwordResetExpires akan kosong/undefined

## Bagian 14: Account Verification || Backend

### Account Verification Email controller & routes

    Todo:
    1.  model/users/User.js
        - agar lebih muda copy dan paste dari code Generate password reset token lalu modifikasi
        - Generate token for account verification
        - userSchema.methods.generateAccVerificationToken
        - generate token
        - Assign the token to accountVerificationToken field
        - update the accountVerificationExpires and when to expire
    2.  utils/sendAccVerificationEmail.js
        - duplikat file utils/sendEmail lalu beri nama sendAccVerificationEmail.js
        - nama function dan module.export di beri nama : sendAccVerificationEmail
        - kemudian pada isi code bagian message di modifikasi untuk keperluan verifikasi email
    3.  controllers/users/usersController.js
        - exports.accountVerificationEmail
        - find the loggin user email
        - send the token
        - resave
        - import dan pasang sendAccVerificationEmail
        - send the email
        - response (200)
    4.  routes/users/usersRouter.js
        - send account verification email
        - method:put('/account-verification-email')
        - import dan pasang accountVerificationEmail
        - pasang isLoggin
    5.  pengujian pada postman
        - PUT {{baseURL}}/users/account-verification-email
        - body -> row -> json:
            {

                "email":"arisandiujang@gmail.com"
            }
        - noted: email pada body harus terdaftar pada aplikasi dan email asli yang dapat menerimapesan email
        - response akan menampilkan : "message": "Account verificatioon email sent arisandiujang@gmail.com"
        - lihat pada inbox email yang kita masukan pada body yakni arisandiujang@gmail.com
          akan ada pesan account verification

### Verify Account

    Todo:
    1.  model/users/User.js
        - agar lebih muda dipahami ganti resetToken dengan verificationToken
    2.  controllers/users/usersController.js
        - exports.verifyAccountexports.accountVerificationEmail
        - Get the id/token  /params
        - Convert the token to actual verifyToken that has been  saved in the db
        - find the user by the crypto token
        - Update user accountUpdate user account
        - reset the user
        - response (200)
    3.  routes/users/usersRouter.js
        - verify account
        - method:put('/account-verification/:verifyToken')
        - import dan pasang accountVerificationEmail
        - pasang isLoggin
    4.  pengujian pada postman
        - login dengan account yang ingin di verifikasi
        - Account verification email :
            PUT {{baseURL}}/users/account-verification-email
            - body -> row -> json:
            {

                "email":"arisandiujang@gmail.com"
            }

        - response akan menampilkan : "message": "Account verification email sent arisandiujang@gmail.com"
        - noted: email pada body harus terdaftar pada aplikasi dan email asli yang dapat menerimapesan email
        - lihat pada inbox email yang kita masukan pada body yakni arisandiujang@gmail.com,
          akan ada pesan account verification, klik link
        - kemudian akan di redirect ke halaman web copas verifyToken pada path dan pastekan pada request  verify account

        - verify account :
            PUT {{baseURL}}/users/account-verification/<account-verification/:verifyToken>

        - response akan menampilkan : "message": "Account verified successfully"
        - dan pada user yang sudah terverifikasi akan ada field pada database yakni : "isVerified": "true"

### Is Account Verified Middleware

    Todo:
    1.  middlewares/isAccountVerified.js
        - import dan pasang model User
        - buat function chekAccountVerification(v)
        - find the login user
        - pasang try catch
            - check if user is verified
            - buat status 401, dan 500
    2.  routes/posts/postsRouter.js
        - import dan pasang checkAccountVerification
        - pada create post tambahkaan checkAccountVerification
            * method:post('isLoggin, checkAccountVerification, createPos')
    3.  model/User.js
        - ubah isVerify dari type string ke Boolean
            *   isVerified: {
                    type: Boolean,
                    required: false,
                },
    4.  pengujian pada postman
        - mudaahnya, register akun baru
        - kemudian login dengan akun tersebut
        - jangan lakukan verifikasi email terlebih dahulu
        - lalu coba request create post
            POST {{baseURL}}/posts
            - body -> row -> json:
            {
                "title":"Why Mern 2",
                "content":"some content",
                "categoryId":"64d49e37d07a62ad8e4de61e"
            }

        - response akan menampilkan : "message": "Account not verified"

        - coba uji create post  dengan akun yang sudah terferifikasi,
        - respon akan menampilkan pesan status : "succes"(200)
        - artinya user yang sudah terferifikasi dapat membuat data post baru
        - sampai sini setup yang kita lakukan untuk middleware verifikasi succes.

## Bagian 15: Post Likes & Dislikes Controllers || Backend

### Post Like Controller & Route

    Todo :
    1.  controllers/posts/postsController.js
        - exports.likePost
        - Get the id the post
        - get the login user
        - find the post
        - push the user into post likes
        - remove the user from the dislikes array if parrent
        - Save the updated post
        - response status(200)
    2.  routes/post/postsRouter.js
        - like post
        - method : put('/likes/:id') id => id post
        - import dan pasang likePost
    3.  pengujian pada postman:
        - login dengan user yang terdaftar
        - get all user untuk mengcopy salah satu id post
        - request like post
            PUT {{baseURL}}/posts/likes/<id post>
        - response akan menampilkan : status :"success"(200)
          & data post

### Disliking a Post & remove doble like & doble dislike

    Todo :
    1.  controllers/posts/postsController.js
        - pada exports.likePost tambahkan logic remove doble like
            - Toggle the user in post likes(if else condtion)
            - modifikasi code Add the user to the likes array

        - exports.disLikePos
        - Get the id of the post
        - get the login user
        - find the post
        - Push thr user into post dislikes
        - Toggle the user in post dislikes(if else condition)
            - Remove the user from the dislikes array
            - Add the user to the dislikes array
            - Remove the user from the likes array if present
        - Save the updated post
        - response status(200)
    2.  routes/post/postsRouter.js
        - dislike post
        - method : put('/dislikes/:id') id => id post
        - import dan pasang disLikePost
    3.  models/Post/Post.js
        - rubah field disLike menjadi dislike
    4.  pengujian pada postman:
        - login dengan user yang terdaftar
        - get all user untuk mengcopy salah satu id post
        - request dislike post
            PUT {{baseURL}}/posts/dislikes/<id post>
        - response akan menampilkan : status :"success"(200)
          & data post
        - jika dislike di request lagi maka data dislike akan hilang
        - begitupun jika user me-like post kembali ketika sudah like maka data like akan terhapus.

## Bagian 16: Post Claps & Scheduling Controllers || Backend

### Post Claps Controller & route

    Todo :
    1.  controllers/posts/postsController.js
        - exports.claps
        - Get the id of the post
        - find the post
        - Implement the claps using $inc
        - Fetch the updated post
        - response status(200)
    2.  routes/post/postsRouter.js
        - clap post
        - method : put('/claps/:id') id => id post
        - import dan pasang claps
    3.  pengujian pada postman:
        - login dengan user yang terdaftar
        - get all user untuk mengcopy salah satu id post
        - request dislike post
            PUT {{baseURL}}/posts/claps/<id post>
        - response akan menampilkan : status :"success"(200)
          & data post
        - data claps akan bertambah jika request claps di request ulang

### Schedule Post Controller & routes

    Todo :
    1.  controllers/posts/postsController.js
        - exports.schedule
        - get the payload
        - check if postId and scheduledPublish found
        - find the post
        - check if the user is the author of the post
        - check if the scheduledPublish date is in the past
        - update the post
        - response status(200)
    2.  routes/post/postsRouter.js
        - schedule post
        - method : put('/schedule/:postId')
        - import dan pasang schedule
    3.  pengujian pada postman:
        - login dengan user yang terdaftar
        - get all user untuk mengcopy salah satu id post
        - request dislike post
            PUT {{baseURL}}/posts/schedule/<id post>
            body -> raw-> json:
            {
                "scheduledPublish":"2023-08-16"
            }
        - response akan menampilkan : status :"success"(200)
          & data post
        - noted:
            - perhatikan penulisan tanggal pada body, jika salah akan error
            - tanggal harus +1 dari hari ini
            - scheduledPublish ini adalah yang menampung req.body

## Bagian 17: Hiding & Shwoing Post

### Hiding Posts From Blocked Users Controller

    Todo :
    1.  controllers/posts/postsController.js
        - pada exports.getPosts rubah public jadi private(harus loggin)
        - find all users who have blocked the logged-in user
        - Extract the IDs of users whow have blocked the logged-in user
    2.  routes/post/postsRouter.js
        - getting all posts
        - method : get('/', isLoggedIn) , tambahkan isLoggedIn sebelum getPosts
    3.  pengujian pada postman:
        - login dengan user yang terdaftar dan sudah terverifikasi user
        - kemudian dengan user tersebut buat sebuah categori & satu buah post dengan category yang kita buat
        - register user baru, kemudian copy id user tersebut
        - request block user
            PUT {{baseURL}}/users/block/<id yang kita copy dari akun yang baru di register>
        - jika sudah berhasil di blok, login dengan user yang baru saja di block
        - coba request get all post
        - response akan menampilkan array kosong:
            {
                "status": "success",
                "message": "Posts successfully fetched",
                "posts": []
            }
        - ini terjadi karna user tersebut ter-blok oleh user yang membuat post dan hanya ada satu post yang ada pada get all post
        - dalam kasus ini jika ada satu user lain yang membuat post , maka hanya post tersebut yang dapat dilihat oleh user yang baru register.

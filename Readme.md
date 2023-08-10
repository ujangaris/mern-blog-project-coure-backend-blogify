# BACKEND blogify

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

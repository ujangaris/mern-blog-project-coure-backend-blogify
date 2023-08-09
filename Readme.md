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

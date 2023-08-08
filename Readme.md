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

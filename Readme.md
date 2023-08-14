# BACKEND blogify

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

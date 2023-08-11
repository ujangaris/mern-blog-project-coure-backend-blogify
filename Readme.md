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

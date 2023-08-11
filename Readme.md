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

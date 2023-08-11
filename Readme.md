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

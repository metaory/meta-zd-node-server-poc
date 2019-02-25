# meta-zd-node-server-poc

Zero Dependency Node Server POC

### Setup

just run `npm start`

* * *

#### list users

    curl --request GET \
      --url http://localhost:3000/api/users

* * *

#### get user

    curl --request GET \
      --url http://localhost:3000/api/users{userId}

* * *

#### create user

    curl --request POST \
      --url http://localhost:3000/api/users \
      --header 'content-type: application/json' \
      --data ' {
      "name": "foo Hilfiger",
      "gender": "male",
      "email": "test@pvh.com",
      "phone": "+31612345678",
      "address": [{
        "number": 7,
        "street": "Danzigerkade",
        "city": "Amsterdam",
        "zipcode": "1234 AB"
      },{
        "number": 10,
        "street": "Xorg",
        "city": "Arch",
        "zipcode": "101 LOL"
      }
     ]
    }'

* * *

#### update user

    curl --request PUT \
      --url http://localhost:3000/api/users{userId} \
      --header 'content-type: application/json'

* * *

#### delete user

    curl --request DELETE \
      --url http://localhost:3000/api/users{userId}

* * *

#### flush database

    curl --request DELETE \
      --url http://localhost:3000/api/users

* * *

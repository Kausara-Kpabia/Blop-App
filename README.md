# Blog App
This is an api for a blog

---

## Requirements
1. User should be able to register. 
2. User should be able to login with Passport using JWT.
3. Logged in and logged out users should be able to get blogs.
4. Logged in Users should be able to create blogs.
5. Logged in Users should be able to update blog state, edit and delete blogs.
6. Test application.

---

## Setup 

- Install NodeJS, mongodb
- pull this repo
- update env with .env
- run `npm run start:dev`

---

## Base URL

- heroku.com


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  firstname | string  |  required|
|  lastname  |  string |  required  |
|  email     | string  |  required, unique |
|  password |   string |  required  |


### Blog
| field  |  data_type | constraints  |
|---|---|---|
|  title |  string |  required, unique |
|  timestamp |  date |  required |
|  description | string |  optional |
|  author  |  string |  required  |
|  state     | string  |  required, enum: ['draft', 'published'] |
|  tags |   string |  optional  |
|  body |  string |  required |



## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "password": "Password1",
  "firstname": "jon",
  "lastname": "doe",
}
```

- Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "email": "doe@example.com",
        "password": "Password1",
        "firstname": "jon",
        "lastname": "doe",
        "username": 'jon_doe",
    }
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
  "password": "Password1",
  "email": "doe@example.com",
}
```

- Responses

Success
```
{
    message: 'Login successful',
    token: 'sjlkafjkldsfjsd'
}
```

---
### Create Blog

- Route: /createBlog
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    
}
```

- Responses

Success
```
{
    title:bjsh
    author:mark
    description:ekjhbkevj
    body:bbejghibejkgjner
    state: published,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
}
```
---
### Get Blog

- Route: /orders/:id
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
    
}
```
---

### Get Blogs

- Route: /orders
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - page (default: 1)
    - per_page (default: 20)
    - state
    - created_at
- Responses

Success
```
{
    title:bjsh
    author:mark
    description:ekjhbkevj
    body:bbejghibejkgjner
    state: published,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
}
```
---

...

## Contributor
- Kausara Kpabia
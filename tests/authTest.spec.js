const request = require('supertest')
const { connect } = require('./database')
const UserModel = require('../models/users')
const app = require('../app.js');

describe('Auth: Signup', () => {
    let conn;

    beforeAll(async () => {
        conn = await connect()
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should signup a user', async () => {
        const response = await request(app).post('/signup')
        .set('content-type', 'application/json')
        .send({ 
            username: 'kay', 
            password: 'Password123', 
            firstName: 'kayie',
            lastName: 'sara',
            email: 'kayie@mail.com'
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('username', 'kay')
        expect(response.body.user).toHaveProperty('firstname', 'kayie')
        expect(response.body.user).toHaveProperty('lastname', 'sara')
        expect(response.body.user).toHaveProperty('email', 'kayie@mail.com')        
    })


    it('should login a user', async () => {
        // create user in out db
        const user = await UserModel.create({ username: 'kay', password: '123456'});

        // login user
        const response = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ 
            username: 'kay', 
            password: '123456'
        });
    

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')      
    })
})
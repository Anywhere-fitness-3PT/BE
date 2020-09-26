const supertest = require("supertest")
const server = require("../server")
const db = require("../database/dbConfig")
require('dotenv').config({
    path: '.env'
})

afterAll(async () => {
	// close the database connection so the test process doesn't hang or give a warning
	await db.destroy()
})
let token;
beforeEach((done) => {
    supertest(server)
    .post('/clients/login')
    .send({
        username: 'client14@gmail.com',
        password: 'password14'
    })
    .end((err, response) => {
        token = response.body.token;
        done();
    })
})
describe('get classes', function(){

    it('should require authorization', async () => {
        
        const res = await supertest(server)
            .get("/clients/classes")
            .send({
                username: 'client14@gmail.com',
                password: 'password14'
            })
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
    })

})
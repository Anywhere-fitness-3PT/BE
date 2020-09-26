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

describe('create user', function(){

    it('should post clients/register', async () => {
		const res = await supertest(server)
			.post("/clients/register")
			.send({
                name: 'client name',
                email: 'client14@gmail.com',
                password: 'password14'
            })
		expect(res.statusCode).toBe(201)
		expect(res.type).toBe("application/json")
    })
})
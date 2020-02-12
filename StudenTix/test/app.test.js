/*
* This file will be used to test the basic funtionalities of our app.
* For example, when going to '/' it should reder the homepage.
*  NOTE: To use this you will need to do 'npm install mocha -g' (use sudo if
* you get permission errors )
* In the root directory, you will need to run 'mocha' and the tests should begin
*/
const request = require('supertest')
const app = require('../app')
const expect = require('chai').expect

describe('GET /', function() {
    it('should render the homepage', async function() {
        const response = await request(app).get('/')

        expect(response.statusCode).to.equal(200)
    })
})

describe('GET /signup', function() {
    it('should render the signup page', async function() {
        const response = await request(app).get('/signup')

        expect(response.statusCode).to.equal(200)
    })
})

describe('GET /login', function() {
    it('should render the login page', async function() {
        const response = await request(app).get('/login')

        expect(response.statusCode).to.equal(200)
    })
})

describe('GET /logout', function() {
    it('should redirect a user to /', async function() {
        const response = await request(app).get('/logout')

        expect(response.statusCode).to.equal(302)
        expect(response.headers.location).to.equal('/')
    })
})

describe('GET /forgot', function() {
    it('should render the forgot page', async function() {
        const response = await request(app).get('/forgot')

        expect(response.statusCode).to.equal(200)
    })
})

describe('GET /tickets', function(){
    it('should render the ticket page', async function() {
        const response = await request(app).get('/tickets')
        expect(response.statusCode).to.equal(200)
    })

    describe('GET /viewTickets', function(){
        it('should render the ticket page', async function() {
            const response = await request(app).get('/tickets')
            expect(response.statusCode).to.equal(200)
        })
})

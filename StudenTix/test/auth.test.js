/*
* This file will be used to test the authentication portion of our app.
* for example, when someone logs in it should work.
* For usage instructions, view the comment in app.test.js
*/
const request = require('supertest')
const app = require('../app')
const expect = require('chai').expect
const User = require('../models/User')

describe('A successful signup form submission', function() {
    const userData = {
        username: 'supertest',
        email: 'test@test.com',
        password: 'password',
        passwordConfirmation: 'password'
    }

    it('should create a new user in the database with a hashed password', async function() {
        const response = await request(app)
            .post('/auth/signup')
            .set('Accept', 'application/json')
            .send(userData)

        const user = await User.findOne({
            where: { username: 'supertest' }
        })

        expect(user.username).to.equal('supertest')
        expect(user.email).to.equal('test@test.com')
        expect(user.password.toString()).to.not.equal('password')
        expect(response.statusCode).to.equal(302)

        user.destroy()
    })
})

describe('A successful ticket post', function() {
    const ticketData = {
        ticketGame: 'Iowa vs Texas',
        ticketStart: '7pm',
        gameLocation:'Hilton',
        seatNumber: '14',
        section: 'AA',
        price: '50',
        owner: 'Jake Shedenhelm',
        type: 'Football'
    }

    it('should create a new ticket in the database', async function(){
        const repsonse = await request(app)
            .post('/tickets/newTicket')
            .set('Accept', 'applicaton/json')
            .send(ticketData)

        const ticket = await Ticket.findOne({
            where: { ticketStart: '7pm'}
        })
        expect(ticket.ticketStart).to.equal('7pm')
    })
})


/*
* *-----------------------------
*  Login Page Testing
* *-----------------------------
*/

describe('A successful login post', function() {
    const userData = {
        username: 'correctUsername',
        email: 'test@test.com',
        password: 'correctPassword',
        passwordConfirmation: 'correctPassword'
    }

    it('should show a user and redirect a user to the home page', async function() {
        await request(app)
            .post('/auth/signup')
            .set('Accept', 'application/json')
            .send(userData)

        const response = await request(app)
            .post('/auth/login')
            .set('Accept', 'application/json')
            .send(userData)

        const user = await User.findOne({
            where: { username: 'correctUsername' }
        })

        expect(user.username).to.equal('correctUsername')
        expect(user.email).to.equal('test@test.com')
        expect(response.headers.location).to.equal('/')

        user.destroy()
    })
})

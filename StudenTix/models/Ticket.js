const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const Ticket = sequelize.define('ticket', {
    ticketGame: Sequelize.STRING(100),
    ticketStart: Sequelize.STRING(10),
    gameLocation: Sequelize.STRING(100),
    seatNumber: Sequelize.STRING(10),
    section: Sequelize.STRING(10),
    price: Sequelize.STRING(10),
    owner: Sequelize.STRING(100),
    type: Sequelize.STRING(100)
})

module.exports = Ticket

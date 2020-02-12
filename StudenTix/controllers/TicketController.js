var hbs = require('hbs');
var mysql = require('mysql');
const passport = require('passport')
const bcrypt = require('bcrypt')
const crypto = require('crypto-promise')
const User = require('../models/User')
const Ticket = require('../models/Ticket')
const moment = require('moment')
const { check, validationResult } = require('express-validator/check')
const http = require('http')
const mailgun = require('mailgun-js')({
    apiKey: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN
})

const saltRounds = 10
var ticketIds = [];
var ticketList = [];

exports.ticketsPost = (req, res) => {
    res.render('TicketLister/tickets')
}
exports.buyTicket = (req, res) => {
    res.render('TicketLister/buyTicket')
}



exports.ticketShow = async (req, res) => {
    try {
        const ticketInfo = await Ticket.findAll().then(tickets=> {
            ticketList = tickets;
            })

        res.render('TicketLister/showTicket',{
             title: 'View Tickets in Detail',
             game: ticketList})
    } catch (err) {
        console.log(err)
    }

}

exports.ticketsGet = async (req, res) => {
    try {
        const ticketInfo = await Ticket.findAll().then(tickets=> {
            ticketList = tickets;
            })

        res.render('TicketLister/viewTickets',{
             title: 'View Tickets to Purchase',
             game: ticketList})
    } catch (err) {
        console.log(err)
    }

}


/*
* POST /tickets
*/

exports.postTicket = (req, res, next) => {
        createTicket(req, res, next)
}

async function createTicket(req, res, next) {

    try{
        const ticket = await new Ticket({
            ticketGame: req.body.ticketGame,
            ticketStart: req.body.ticketStart,
            gameLocation: req.body.gameLocation,
            seatNumber: req.body.seatNumber,
            section: req.body.section,
            price: req.body.price,
            owner: req.body.owner,
            type: req.body.type
        }).save()
        res.render('TicketLister/tickets')
    }catch (err) {
        console.log(err)
    }

}

exports.postDelete = (req, res, next) => {
        deleteTicket(req, res, next)
}

async function deleteTicket(req, res, next) {

    try{
        const ticket = await new Ticket({
            ticketGame: "",
            ticketStart: "",
            gameLocation: "",
            seatNumber: "",
            section: "",
            price: "",
            owner: "",
            type: ""
        }).save()
        res.render('TicketLister/tickets')
    }catch (err) {
        console.log(err)
    }

}

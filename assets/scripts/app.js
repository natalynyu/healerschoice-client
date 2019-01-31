'use strict'

const authorizationEvents = require('./authorization/events')
const reservationEvents = require('./reservations/events')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  authorizationEvents.addAuthorizationHandlers()
  reservationEvents.addReservationHandlers()
  $('#sign-out').hide()
  $('#change-password').hide()
  $('#change-pw-heading').hide()
})

'use strict'

const authorizationEvents = require('./authorization/events')
const reservationEvents = require('./reservations/events')
const doctorEvents = require('./doctors/events')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  authorizationEvents.addAuthorizationHandlers()
  reservationEvents.addReservationHandlers()
  doctorEvents.addDoctorHandlers()
  $('#sign-out').hide()
  $('#change-password').hide()
  $('#change-pw-heading').hide()
  $('#edit-reservation').hide()
  $('#edit-reservation-heading').hide()
  $('#create-doctor-info-heading').hide()
  $('#create-doctor-info').hide()
  $('.reservation-management').hide()
  $('#update-existing-doctor-info').hide()
  $('#cancel-edit-button').hide()
  $('#change-password-button').hide()
})

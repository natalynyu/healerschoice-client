'use strict'

// const editformTemp = require('../templates/edit-form.handlebars')
const api = require('./api.js')

// Create User UI
const onCreateReservationSuccess = responseData => {
  $('#create-reservation-message').text('Successfully created reservation!').show().fadeOut(4000)
  $('#edit-reservation-heading').hide()
  $('#edit-reservation').hide()
  $('.user-reservations').hide()
  const machine = responseData.reservation.machine
  const startTime = responseData.reservation.start_time
  const endTime = responseData.reservation.end_time
  const doctorFullName = responseData.reservation.doctor.full_name
  const doctorDept = responseData.reservation.doctor.department
  $('#newly-created-reservation').text('Reservation of ' + machine + ' for ' + doctorFullName + ' (Dept: ' + doctorDept + ') on ' + startTime + ' - ' + endTime + ' was successfully created!')
}

const onCreateReservationFail = () => {
  $('#create-reservation-message').text('Error with creating reservation. Please try again.').show()
}

const escapeForHtml = (text) => {
  return $('<div>').text(text).html()
}

const onShowUserReservationsSuccess = responseData => {
  $('.user-reservations').text('')
  $('#newly-created-reservation').text('')
  $('.user-reservations').append('<tr><th>Machine</th><th>Start Time</th><th>End Time</th></tr>')
  responseData.reservations.forEach(reservation => {
    $('.user-reservations').append(`<tr>
      <td>${escapeForHtml(reservation.machine)}</td>
      <td>${reservation.start_time}</td>
      <td>${reservation.end_time}</td>
      <td><input type="button" class="edit-reservation-button btn btn-outline-primary" value="Edit" data-id="${reservation.id}"></td>
      <td><input type="button" class="delete-reservation-button btn btn-outline-primary" value="Delete" data-id="${reservation.id}"></td>
    </tr>`)
  })
  $('.user-reservations').show()
}

const onShowUserReservationsFail = () => {
  $('#show-reservations-message').text('Error with showing reservations. Please try again').show()
}

const onUpdateReservationSuccess = () => {
  $('.user-reservations').hide()
  $('#edit-reservation-heading').hide()
  $('#edit-reservation').hide()
  api.showUserReservations()
  $('#update-reservation-message').text('Successfully updated reservation!').show().fadeOut(3000)
}

const onUpdateReservationFail = () => {
  $('#update-reservation-message').text('Error with updating reservation. Please try again.').show()
}

const onDeleteReservationSuccess = () => {
  $('.user-reservations').hide()
  api.showUserReservations()
  $('#delete-reservation-message').text('Successfully deleted reservation.').show().fadeOut(5000)
}

const onDeleteReservationFail = () => {
  $('#delete-reservation-message').text('Error with deleting reservation. Please try again.').show()
}

module.exports = {
  onCreateReservationSuccess,
  onCreateReservationFail,
  onShowUserReservationsSuccess,
  onShowUserReservationsFail,
  onUpdateReservationSuccess,
  onUpdateReservationFail,
  onDeleteReservationSuccess,
  onDeleteReservationFail
}

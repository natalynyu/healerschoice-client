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
  const startTime = new Date(responseData.reservation.start_time).toLocaleString()
  const endTime = new Date(responseData.reservation.end_time).toLocaleString()
  const doctorFullName = responseData.reservation.doctor.full_name
  const doctorDept = responseData.reservation.doctor.department
  $('#new-reservation-message').text('Reservation of ' + machine + ' for ' + doctorFullName + ' (Department: ' + doctorDept + ') from ' + startTime + ' to ' + endTime + ' was successfully created!')
}

const onCreateReservationFail = () => {
  $('#create-reservation-message').text('Error with creating reservation. Please try again.').show()
}

const escapeForHtml = (text) => {
  return $('<div>').text(text).html()
}

const onShowUserReservationsSuccess = responseData => {
  $('#show-my-reservations').hide()
  $('.user-reservations').text('')
  $('#new-reservation-message').text('')
  if (responseData.reservations.length > 0) {
    $('.user-reservations').append('<tr><th>Machine</th><th>Start Time</th><th>End Time</th></tr>')
    responseData.reservations.forEach(reservation => {
      $('.user-reservations').append(`<tr>
        <td>${escapeForHtml(reservation.machine)}</td>
        <td>${new Date(reservation.start_time).toLocaleString()}</td>
        <td>${new Date(reservation.end_time).toLocaleString()}</td>
        <td><input type="button" class="edit-reservation-button btn btn-outline-primary" value="Edit" data-id="${reservation.id}"></td>
        <td><input type="button" class="delete-reservation-button btn btn-outline-primary" value="Delete" data-id="${reservation.id}"></td>
      </tr>`)
    })
    $('.user-reservations').show()
  } else {
    $('#no-reservations-indicator').text('You have no reservations yet.').show().fadeOut(2000)
    $('#show-my-reservations').show()
  }
}

const onShowUserReservationsFail = () => {
  $('#show-reservations-message').text('Error with showing reservations. Please try again').show()
}

const onUpdateReservationSuccess = () => {
  $('.user-reservations').hide()
  $('#edit-reservation-heading').hide()
  $('#edit-reservation').hide()
  $('#cancel-edit-button').hide()
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

'use strict'

// const editformTemp = require('../templates/edit-form.handlebars')
const formatServerTime = require('../formatServerTime')
const parseServerError = require('../parseServerError')

// Create User UI
const onCreateReservationSuccess = responseData => {
  $('#create-reservation-message').text('Successfully created reservation!').show().fadeOut(4000)
  $('#edit-reservation-heading').hide()
  $('#edit-reservation').hide()
  $('.user-reservations').hide()
  const machine = responseData.reservation.machine
  const startTime = formatServerTime(responseData.reservation.start_time)
  const endTime = formatServerTime(responseData.reservation.end_time)
  const doctorFullName = responseData.reservation.doctor.full_name
  const doctorDept = responseData.reservation.doctor.department
  $('#new-reservation-message').text('Successfully reserved the ' + machine + ' for ' + doctorFullName + ' (Department: ' + doctorDept + ') from ' + startTime + ' to ' + endTime + '!')
}

const onCreateReservationFail = (request) => {
  $('#create-reservation-message').text('Error with creating reservation: ' + parseServerError(request) + '. Please try again.').show()
}

const escapeForHtml = (text) => {
  return $('<div>').text(text).html()
}

const makeReservationRowHtml = reservation => {
  return `<td>${escapeForHtml(reservation.machine)}</td>
  <td>${formatServerTime(reservation.start_time)}</td>
  <td>${formatServerTime(reservation.end_time)}</td>
  <td><input type="button" class="edit-reservation-button btn btn-outline-primary" value="Edit"
    data-id="${reservation.id}"
    data-machine="${escapeForHtml(reservation.machine)}"
    data-start_time="${reservation.start_time}"
    data-end_time="${reservation.end_time}"></td>
  <td><input type="button" class="delete-reservation-button btn btn-outline-primary" value="Delete"
    data-id="${reservation.id}"></td>`
}

const onShowUserReservationsSuccess = responseData => {
  $('#hide-my-reservations').show()
  $('#show-my-reservations').hide()
  $('.user-reservations').text('')
  $('#new-reservation-message').text('')
  if (responseData.reservations.length > 0) {
    $('.user-reservations').append('<tr><th>Machine</th><th>Start Time</th><th>End Time</th></tr>')
    responseData.reservations.forEach(reservation => {
      $('.user-reservations').append(`<tr data-id="${reservation.id}">
        ${makeReservationRowHtml(reservation)}
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

const onUpdateReservationSuccess = (id, formData) => {
  $('#edit-reservation-heading').hide()
  $('#edit-reservation').hide()
  $('#cancel-edit-button').hide()
  $('#update-reservation-message').text('Successfully updated reservation!').show().fadeOut(3000)
  $(`.user-reservations tr[data-id=${id}]`).html(makeReservationRowHtml({
    id: id,
    machine: formData.reservation.machine,
    start_time: formData.reservation.start_time,
    end_time: formData.reservation.end_time
  }))
}

const onUpdateReservationFail = request => {
  $('#update-reservation-message').text('Error with updating reservation: ' + parseServerError(request) + '. Please try again.').show()
}

const onDeleteReservationSuccess = (id) => {
  $(`.user-reservations tr[data-id=${id}]`).remove()
  // $('.user-reservations').hide()
  // api.showUserReservations()
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

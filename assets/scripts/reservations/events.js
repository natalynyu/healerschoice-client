'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const editformTemp = require('../templates/edit-form.handlebars')

const onCreateReservation = event => {
  event.preventDefault()
  $('#show-my-reservations').show()
  const formData = getFormFields(event.target)
  const now = new Date().getTime()
  if (formData.reservation.start_time >= formData.reservation.end_time) {
    $('#new-reservation-message').text('End time must be later than start time. Please try again.').show()
    return
  } else if (new Date(formData.reservation.start_time).getTime() < now || new Date(formData.reservation.end_time).getTime() < now) {
    $('#new-reservation-message').text('Reservation cannot be in the past. Please try again.').show()
    return
  }
  api.createReservation(formData)
    .then(ui.onCreateReservationSuccess)
    .catch(ui.onCreateReservationFail)
  $('form').trigger('reset')
}

const onShowUserReservations = event => {
  event.preventDefault()
  api.showUserReservations()
    .then(ui.onShowUserReservationsSuccess)
    .catch(ui.onShowUserReservationsFail)
}

const showReservationUpdateForm = event => {
  $('.user-reservations').hide()
  $('#show-my-reservations').show()
  $('#edit-reservation-heading').show()
  $('#cancel-edit-button').show()
  const id = event.target.dataset.id
  const updateReservationTable = editformTemp({data: id})
  $('#edit-form').html(updateReservationTable).show()
}

const onUpdateReservation = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  const id = event.target.dataset.reservationid
  api.updateReservation(id, formData)
    .then(ui.onUpdateReservationSuccess)
    .catch(ui.onUpdateReservationFail)
  $('form').trigger('reset')
}

const hideEditSection = event => {
  $('#cancel-edit-button').hide()
  $('#edit-reservation-heading').hide()
  $('#edit-form').hide()
}

const onDeleteReservation = event => {
  event.preventDefault()
  $('#show-my-reservations').show()
  const id = event.target.dataset.id
  api.deleteReservation(id)
    .then(ui.onDeleteReservationSuccess)
    .catch(ui.onDeleteReservationFail)
}

const addReservationHandlers = () => {
  $('#create-reservation').on('submit', onCreateReservation)
  $('#show-my-reservations').on('click', onShowUserReservations)
  $('.user-reservations').on('click', '.edit-reservation-button', showReservationUpdateForm)
  $('body').on('click', '#cancel-edit-button', hideEditSection)
  $('body').on('submit', '#edit-reservation', onUpdateReservation)
  $('.user-reservations').on('click', '.delete-reservation-button', onDeleteReservation)
}

module.exports = {
  addReservationHandlers
}

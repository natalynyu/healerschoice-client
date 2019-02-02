'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const editformTemp = require('../templates/edit-form.handlebars')

const onCreateReservation = event => {
  event.preventDefault()
  $('#show-my-reservations').show()
  const formData = getFormFields(event.target)
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
  const id = event.target.dataset.id
  const updateReservationTable = editformTemp({data: id})
  $('#edit-form').html(updateReservationTable)
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
  $('body').on('submit', '#edit-reservation', onUpdateReservation)
  $('.user-reservations').on('click', '.delete-reservation-button', onDeleteReservation)
}

module.exports = {
  addReservationHandlers
}

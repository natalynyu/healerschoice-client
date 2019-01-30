'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')

const onCreateReservation = event => {
  event.preventDefault()
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

const onUpdateReservation = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.updateReservation()
    .then(ui.onUpdateReservationSuccess)
    .catch(ui.onUpdateReservationFail)
  $('form').trigger('reset')
}

const onDeleteReservation = event => {
  event.preventDefault()
  api.deleteReservation()
    .then(ui.onDeleteReservationSuccess)
    .catch(ui.onDeleteReservationFail)
}
const addReservationHandlers = () => {
  $('#create-reservation').on('submit', onCreateReservation)
  $('#show-my-reservations').on('click', onShowUserReservations)
  $('#edit-reservation').on('submit', onUpdateReservation)
  $('#delete-reservation').on('click', onDeleteReservation)
}

module.exports = {
  addReservationHandlers
}

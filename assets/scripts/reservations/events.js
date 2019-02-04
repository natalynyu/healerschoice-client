'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const editformTemp = require('../templates/edit-form.handlebars')
const toggleReservations = require('../toggleReservations')

const onCreateReservation = event => {
  event.preventDefault()
  toggleReservations(false)
  const formData = getFormFields(event.target)
  const now = new Date().getTime()
  if (formData.reservation.start_time >= formData.reservation.end_time) {
    $('#new-reservation-message').text(`Error: End time must be later than start time. You requested a reservation for the
      ${formData.reservation.machine} between ${new Date(formData.reservation.start_time).toLocaleString()} and
      ${new Date(formData.reservation.end_time).toLocaleString()}. Please try again.`).show()
    $('form').trigger('reset')
    return
  } else if (new Date(formData.reservation.start_time).getTime() < now || new Date(formData.reservation.end_time).getTime() < now) {
    $('#new-reservation-message').text(`Error: Reservations cannot be in the past. You requested a reservation for the
      ${formData.reservation.machine} between ${new Date(formData.reservation.start_time).toLocaleString()} and
      ${new Date(formData.reservation.end_time).toLocaleString()}. Please try again.`).show()
    $('form').trigger('reset')
    return
  } else if ((new Date(formData.reservation.end_time).getTime() / 3600000) - (new Date(formData.reservation.start_time).getTime() / 3600000) > 3) {
    $('#new-reservation-message').text(`Error: Reservations cannot exceed 3 hours. You requested a reservation for the
      ${formData.reservation.machine} between ${new Date(formData.reservation.start_time).toLocaleString()} and
      ${new Date(formData.reservation.end_time).toLocaleString()}. Please try again.`).show()
    $('form').trigger('reset')
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

const serverTimeToDateTimeLocal = time => {
  // The datetime-local expects this format: 2019-02-04T10:30:00.000
  return String(time).replace(/z$/i, '')
}

const showReservationUpdateForm = event => {
  // $('.user-reservations').hide()
  $('#edit-reservation-heading').show()
  $('#cancel-edit-button').show()
  const id = event.target.dataset.id
  const machine = event.target.dataset.machine
  const startTime = event.target.dataset.start_time
  const endTime = event.target.dataset.end_time
  const updateReservationTable = editformTemp({
    id: id,
    machine: machine,
    start_time: serverTimeToDateTimeLocal(startTime),
    end_time: serverTimeToDateTimeLocal(endTime)
  })
  // Can't set the value through HTML, so must set it here afterward
  $('#edit-form').html(updateReservationTable)
    .show()
    .find('#machine').val(machine)
}

const onUpdateReservation = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  const id = event.target.dataset.reservationid
  api.updateReservation(id, formData)
    .then(ui.onUpdateReservationSuccess.bind(null, id, formData))
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
  const id = event.target.dataset.id
  api.deleteReservation(id)
    .then(ui.onDeleteReservationSuccess.bind(null, id))
    .catch(ui.onDeleteReservationFail)
}

const addReservationHandlers = () => {
  $('#create-reservation').on('submit', onCreateReservation)
  $('#show-my-reservations').on('click', onShowUserReservations)
  $('#hide-my-reservations').on('click', toggleReservations.bind(null, false))
  $('.user-reservations').on('click', '.edit-reservation-button', showReservationUpdateForm)
  $('body').on('click', '#cancel-edit-button', hideEditSection)
  $('body').on('submit', '#edit-reservation', onUpdateReservation)
  $('.user-reservations').on('click', '.delete-reservation-button', onDeleteReservation)
}

module.exports = {
  addReservationHandlers
}

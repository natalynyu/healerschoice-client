'use strict'

const store = require('../store')

// Create User UI
const onCreateReservationSuccess = responseData => {
  $('#create-reservation-message').text('Successfully created reservation!').show()
}

const onCreateReservationFail = () => {
  $('#create-reservation-message').text('Error with creating reservation. Please try again.').show()
}

const onShowUserReservationsSuccess = responseData => {
  store.reservation = responseData.reservation
}

const onShowUserReservationsFail = () => {
  $('#show-reservations-message').text('Error with showing reservations. Please try again').show()
}

const onUpdateReservationSuccess = () => {
  $('update-reservation-message').text('Successfully updated reservation!').show()
}

const onUpdateReservationFail = () => {
  $('update-reservation-message').text('Error with updating reservation. Please try again.').show()
}

const onDeleteReservationSuccess = () => {
  $('delete-reservation-message').text('Successfully deleted reservation.').show()
}

const onDeleteReservationFail = () => {
  $('delete-reservation-message').text('Error with deleting reservation. Please try again.').show()
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

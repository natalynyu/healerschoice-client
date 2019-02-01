'use strict'

const config = require('../config')
const store = require('../store')

const createReservation = (formData) => {
  formData.reservation.doctor_id = store.doctor.id
  return $.ajax({
    url: config.apiUrl + '/reservations',
    method: 'POST',
    data: formData,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// Shows the reservations of the signed in user
const showUserReservations = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/reservations',
    method: 'GET',
    data: formData
  })
}

const updateReservation = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/reservations/' + formData.reservation.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

const deleteReservation = (id) => {
  return $.ajax({
    url: config.apiUrl + '/reservations/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createReservation,
  showUserReservations,
  updateReservation,
  deleteReservation
}

'use strict'

const config = require('../config')
const store = require('../store')

const userTimeToServer = time => {
  return new Date(String(time)).toISOString()
}

const createReservation = (formData) => {
  formData.start_time = userTimeToServer(formData.reservation.start_time)
  formData.end_time = userTimeToServer(formData.reservation.end_time)
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
const showUserReservations = () => {
  return $.ajax({
    url: config.apiUrl + '/reservations',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateReservation = (id, formData) => {
  formData.start_time = userTimeToServer(formData.reservation.start_time)
  formData.end_time = userTimeToServer(formData.reservation.end_time)
  return $.ajax({
    url: config.apiUrl + '/reservations/' + id,
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

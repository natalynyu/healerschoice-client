'use strict'

const config = require('../config')
const store = require('../store')

const createReservation = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/new-reservation',
    method: 'POST',
    data: formData
  })
}

// Shows the reservations of the signed in user
const showUserReservations = () => {
  return $.ajax({
    url: config.apiUrl + '/my-reservations',
    method: 'GET'
  })
}

const updateReservation = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/update-reservation',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

const deleteReservation = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/delete-reservation',
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

'use strict'

const config = require('../config')
const store = require('../store')

const createDoctorInfo = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/doctors',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

const getDoctorInfo = () => {
  return $.ajax({
    url: config.apiUrl + '/get-doctor-info',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {user_id: store.user.id}
  })
}

const updateDoctorInfo = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/update-doctor-info',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData,
    method: 'PATCH'
  })
}

module.exports = {
  getDoctorInfo,
  createDoctorInfo,
  updateDoctorInfo
}

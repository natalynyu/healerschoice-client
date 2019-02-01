'use strict'

const config = require('../config')
const store = require('../store')

const createDoctorInfo = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/doctors',
    method: 'POST',
    data: formData
  })
}

const getDoctorInfo = () => {
  return $.ajax({
    url: config.apiUrl + '/get-doctor-info',
    method: 'GET',
    data: {user_id: store.user.id}
  })
}

const updateDoctorInfo = () => {
  return $.ajax({
    url: config.apiUrl + '/update-doctor-info',
    method: 'PATCH'
  })
}
module.exports = {
  getDoctorInfo,
  createDoctorInfo,
  updateDoctorInfo
}

'use strict'

const config = require('../config')
const store = require('../store')

const getDoctorInfo = () => {
  return $.ajax({
    url: config.apiUrl + '/get-doctor-info',
    method: 'GET'
  })
}

const createDoctorInfo = () => {
  return $.ajax({
    url: config.apiUrl + '/doctors',
    method: 'POST'
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

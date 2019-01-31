'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')

const onUpdateDoctorInfo = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.getDoctorInfo()
    .then(ui.onUpdateDoctorInfoSuccess)
    .catch(ui.onUpdateDoctorInfoFail)
  $('form').trigger('reset')
}

const addDoctorHandlers = () => {
  $('#update-doctor-info').on('submit', onUpdateDoctorInfo)
}
module.exports = {
  addDoctorHandlers
}

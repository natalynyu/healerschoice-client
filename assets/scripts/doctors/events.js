'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store')

const onCreateDoctorInfo = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  formData.doctor.user_id = store.user.id
  api.createDoctorInfo(formData)
    .then(ui.onCreateDoctorInfoSuccess)
    .catch(ui.onCreateDoctorInfoFail)
  $('form').trigger('reset')
}

const addDoctorHandlers = () => {
  $('#create-doctor-info').on('submit', onCreateDoctorInfo)
}
module.exports = {
  addDoctorHandlers
}

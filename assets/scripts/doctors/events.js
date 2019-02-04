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

const onUpdateExistingDoctorInfo = event => {
  event.preventDefault()
  $('#create-doctor-info-heading').show()
  $('#create-doctor-info').show()
  $('#update-existing-doctor-info').hide()
}

const addDoctorHandlers = () => {
  $('#create-doctor-info').on('submit', onCreateDoctorInfo)
  $('#update-existing-doctor-info').on('click', onUpdateExistingDoctorInfo)
}
module.exports = {
  addDoctorHandlers
}

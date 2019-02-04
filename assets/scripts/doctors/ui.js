'use strict'

const store = require('../store')
const toggleReservations = require('../toggleReservations')

const onCreateDoctorInfoSuccess = responseData => {
  store.doctor = responseData.doctor
  const doctorFullName = responseData.doctor.full_name
  $('#doctor-info-message').text('')
  $('#doctor-info-message').text('Thanks, ' + doctorFullName + '! Successfully saved your info.').show().fadeOut(3500)
  $('.reservation-management').show()
  toggleReservations(false)
  $('#create-doctor-info').hide()
  $('#create-doctor-info-heading').hide()
  $('#update-existing-doctor-info').show()
  $('#welcome-user-back-message').text('')
  $('#doctorID').val(responseData.doctor.id)
}

const onCreateDoctorInfoFail = () => {
  $('#doctor-info-message').text('Error with adding doctor info. Please try again.').show()
}

const onUpdateDoctorInfoSuccess = responseData => {
  $('#doctor-info-message').text('Successfully updated info.').show().fadeOut(3000)
  $('#create-doctor-info-heading').show()
  $('#create-doctor-info').show()
  $('#update-existing-doctor-info').hide()
  store.doctor = responseData.doctor
}

const onUpdateDoctorInfoFail = () => {
  $('#doctor-info-message').text('Error with updating info. Please try again.').show()
}

module.exports = {
  onCreateDoctorInfoSuccess,
  onCreateDoctorInfoFail,
  onUpdateDoctorInfoSuccess,
  onUpdateDoctorInfoFail
}

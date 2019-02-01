'use strict'

const store = require('../store')

const onCreateDoctorInfoSuccess = responseData => {
  console.log(responseData)
  const doctorFullName = responseData.doctor.full_name
  $('#doctor-info-message').text('Thanks, ' + doctorFullName + '! Successfully saved your info.').show().fadeOut(3500)
  $('#create-doctor-info').hide()
  $('#create-doctor-info-heading').hide()
  $('#doctorID').val(responseData.doctor.id)
}

const onCreateDoctorInfoFail = () => {
  $('#doctor-info-message').text('Error with adding doctor info. Please try again.').show()
}

const onUpdateDoctorInfoSuccess = () => {
  $('#doctor-info-message').text('Successfully updated info.').show()
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

'use strict'

const store = require('../store')

const onUpdateDoctorInfoSuccess = () => {
  $('#doctor-info-message').text('Successfully updated info.').show()
}

const onUpdateDoctorInfoFail = () => {
  $('#doctor-info-message').text('Error with updating info. Please try again.').show()
}
module.exports = {
  onUpdateDoctorInfoSuccess,
  onUpdateDoctorInfoFail
}

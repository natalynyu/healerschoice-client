'use strict'

const store = require('../store')
const doctorApi = require('../doctors/api')
const doctorUi = require('../doctors/ui')
const parseServerError = require('../parseServerError')

// Sign Up UI
const onSignUpSuccess = responseData => {
  $('#signup-message').text('Successfully created an account!').show().fadeOut(4000)
}
const onSignUpFail = (request) => {
  $('#signup-message').text('There was a problem signing up: ' + parseServerError(request) + '. Please try again.').show()
}
// Sign In UI
const onSignInSuccess = responseData => {
  store.user = responseData.user
  $('#sign-out').show()
  $('#create-doctor-info-heading').show()
  $('#create-doctor-info').show()
  $('#sign-in-heading').hide()
  $('#sign-up-heading').hide()
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#signup-message').hide()
  $('#signout-message').hide()
  $('#signin-message').text('You have successfully signed in.').show().fadeOut(4000)
  doctorApi.getDoctorInfo()
    .then(doctorUi.onGetDoctorInfoSuccess)
    .catch(error => {
      $('#doctor-info-message').text('Error obtaining doctor info: ' + parseServerError(error) + '. Please try again.').show()
    })
}
const onSignInFail = () => {
  $('#signin-message').text(`Please check your login credentials.`).show()
}
// Password Update UI
const onChangePasswordSuccess = () => {
  $('#change-password').hide()
  $('#change-pw-heading').hide()
  $('#change-password-button').show()
  $('#password-message').text('Password was updated successfully.').show().fadeOut(3000)
}
const onChangePasswordFail = () => {
  $('#password-message').text('Error with changing your password. Please try again.').show()
}
// Sign Out UI
const onSignOutSuccess = () => {
  // clear the user's store
  for (const key of Object.keys(store)) {
    delete store[key]
  }
  $('#signout-message').text('You have signed out successfully.').show()
  $('#change-pw-heading').hide()
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#create-doctor-info-heading').hide()
  $('#create-doctor-info').hide()
  $('.reservation-management').hide()
  $('.user-reservations').hide()
  $('#update-existing-doctor-info').hide()
  $('#change-password-button').hide()
  $('#welcome-user-back-message').text('')
  $('#new-reservation-message').text('')
  $('#sign-in-heading').show()
  $('#sign-up-heading').show()
  $('#sign-in').show()
  $('#sign-up').show()
  $('#signout-message').fadeOut(1500)
}
const onSignOutFail = () => {
  $('#signout-message').text('Error with signing out. Please try again.').show()
}

module.exports = {
  onSignUpSuccess,
  onSignUpFail,
  onSignInSuccess,
  onSignInFail,
  onChangePasswordSuccess,
  onChangePasswordFail,
  onSignOutSuccess,
  onSignOutFail
}

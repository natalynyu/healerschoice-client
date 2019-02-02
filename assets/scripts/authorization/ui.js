'use strict'

const store = require('../store')
const doctorApi = require('../doctors/api')
// Sign Up UI
const onSignUpSuccess = responseData => {
  $('#signup-message').text('Successfully created an account!').show().fadeOut(4000)
}
const onSignUpFail = (request) => {
  const responseText = request.responseText
  const response = JSON.parse(responseText)
  let message = ''
  for (const key in response) {
    message += `${key.replace(/_/g, ' ')} ${response[key]}`
  }
  $('#signup-message').text('There was a problem signing up: ' + message + '. Please try again.').show()
}
// Sign In UI
const onSignInSuccess = responseData => {
  store.user = responseData.user
  $('#sign-out').show()
  $('#change-password').show()
  $('#change-pw-heading').show()
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
    .then(responseData => {
      console.log(responseData)
      if (responseData == null) {
        $('#doctor-info-message').text('Please provide your information before making a reservation.').show()
        return
      }
      store.doctor = responseData.doctor
      $('.reservation-management').show()
      $('#show-my-reservations').show()
      $('#create-doctor-info-heading').hide()
      $('#create-doctor-info').hide()
      $('#welcome-user-back-message').text(`Welcome back, ${store.doctor.full_name}!`).show()
      $('#update-existing-doctor-info').show()
    })
    .catch(error => {
      $('#doctor-info-message').text('Error obtaining doctor info: ' + error.message)
    })
}
const onSignInFail = () => {
  $('#signin-message').text(`Please check your login credentials.`).show()
}
// Password Update UI
const onChangePasswordSuccess = () => {
  $('#password-message').text('Password was updated successfully.').show().fadeOut(3000)
}
const onChangePasswordFail = () => {
  $('#password-message').text('Error with changing your password. Please try again.').show()
}
// Sign Out UI
const onSignOutSuccess = () => {
  store.user = null
  $('#signout-message').text('You have signed out successfully.').show()
  $('#change-pw-heading').hide()
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#create-doctor-info-heading').hide()
  $('#create-doctor-info').hide()
  $('.reservation-management').hide()
  $('.user-reservations').hide()
  $('#sign-in-heading').show()
  $('#sign-up-heading').show()
  $('#sign-in').show()
  $('#sign-up').show()
  $('#signout-message').fadeOut(1500)
  $('#welcome-user-back-message').text('')
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

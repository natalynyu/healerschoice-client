'use strict'

const store = require('../store')
// Sign Up UI
const onSignUpSuccess = responseData => {
  $('#signup-message').text('Successfully created an account!').show()
}
const onSignUpFail = () => {
  $('#signup-message').text('Error with signing up. Please try again.').show()
}
// Sign In UI
const onSignInSuccess = responseData => {
  store.user = responseData.user
  $('#sign-out').show()
  $('#change-password').show()
  $('#change-pw-heading').show()
  $('#sign-in-heading').hide()
  $('#sign-up-heading').hide()
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#signup-message').hide()
  $('#signout-message').hide()
  $('#signin-message').text('You have successfully signed in.').show().fadeOut(2000)
}
const onSignInFail = () => {
  $('#signin-message').text(`Please check your login credentials.`).show()
}
// Password Update UI
const onChangePasswordSuccess = () => {
  $('#password-message').text('Password was updated successfully.').show().fadeOut(2000)
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

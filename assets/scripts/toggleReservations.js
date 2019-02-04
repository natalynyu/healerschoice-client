const toggleReservations = (show) => {
  if (show) {
    $('.user-reservations').show()
    $('#hide-my-reservations').show()
    $('#show-my-reservations').hide()
  } else {
    $('.user-reservations').hide()
    $('#show-my-reservations').show()
    $('#hide-my-reservations').hide()
  }
}

module.exports = toggleReservations

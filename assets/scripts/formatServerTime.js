const formatServerTime = time => {
  // The "Z" at the end causes it to be timezone-shifted by the Date constructor
  return new Date(String(time).replace(/z$/i, '')).toLocaleString()
}

module.exports = formatServerTime

const parseServerError = request => {
  if (request == null) {
    return 'An unknown error occurred'
  }
  // e.g. "{email: \"already exists\"}"
  const responseText = request.responseText
  let response
  try {
    response = JSON.parse(responseText)
  } catch (e) {
    return request.responseText
  }
  const messages = []
  for (const key in response) {
    messages.push(`${key.replace(/_/g, ' ')} ${response[key]}`)
  }
  return messages.join(', ')
}

// errors = {email: "already exists"}

module.exports = parseServerError

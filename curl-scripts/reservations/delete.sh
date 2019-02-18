#!/bin/bash

curl "https://roomresapi.herokuapp.com/reservations/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}"

echo

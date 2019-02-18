#!/bin/bash

curl "https://roomresapi.herokuapp.com/reservations/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "reservation": {
      "start_time": "'"${START}"'",
      "end_time": "'"${END}"'",
      "machine": "'"${MACHINE}"'"
    }
  }'

echo

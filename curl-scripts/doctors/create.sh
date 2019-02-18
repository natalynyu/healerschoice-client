#!/bin/bash

curl "https://roomresapi.herokuapp.com/doctors" \
  --include \
  --request POST \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "doctor": {
      "full_name": "'"${NAME}"'",
      "department": "'"${DEPT}"'"
    }
  }'

echo

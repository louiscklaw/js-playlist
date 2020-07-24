#!/usr/bin/env bash

set -ex

curl -d '{
  "mock_data": "true",
  "ip_address": "92.188.61.181",
  "email": "user@example.com",
  "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_4) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.100 Safari/534.30",
  "url": "http://example.com/"
}' \
  -H "Content-Type: application/json" \
  https://enrpsi3l80joq4d.m.pipedream.net
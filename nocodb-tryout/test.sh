#!/usr/bin/env bash

set -ex

curl -H "xc-auth: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0BhYmMuY29tIiwiZmlyc3RuYW1lIjpudWxsLCJsYXN0bmFtZSI6bnVsbCwiaWQiOjMsInJvbGVzIjoidXNlciIsImlhdCI6MTYyNzAyMzIxMn0.-9B-D7Xxq2g3q8pnQ1LWNwUt2jaLRuvrXcz3cYPanrg"  http://localhost:18080/nc/123_BxZ7/api/v1/test

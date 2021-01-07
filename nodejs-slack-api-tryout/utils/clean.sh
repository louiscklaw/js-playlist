#!/usr/bin/env bash

set -e

pipenv run slack-cleaner --token $SLACK_TOKEN --message --channel _debug --user "*" --perform

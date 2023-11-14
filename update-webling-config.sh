#!/usr/bin/env bash

#
# Loads the latest webling field mappings from the weblingservice repo and 
# generates the webling-config.json and webling-types.ts files.
#
# Usage: ./update-webling-config.sh
#
# Requires yq and wget to be installed.
#
# See https://github.com/grueneschweiz/weblingservice/blob/master/config/webling-field-mappings.yml
#

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
CONFIG_FILE="$SCRIPT_DIR/src/webling/webling-config.json"
TYPE_FILE="$SCRIPT_DIR/src/webling/webling-types.ts"

if ! type yq >/dev/null 2>&1
then
    echo "yq is required but not found. Install yq first. Aborting."
    exit 1
fi

if ! type wget >/dev/null 2>&1
then
    echo "wget is required but not found. Install wget first. Aborting."
    exit 1
fi

wget -O - https://raw.githubusercontent.com/grueneschweiz/weblingservice/master/config/webling-field-mappings.yml | yq -o=json > "$CONFIG_FILE"

echo "Updated $CONFIG_FILE"

node "$SCRIPT_DIR/src/webling/generate-types.js" < "$CONFIG_FILE" > "$TYPE_FILE"

echo "Updated $TYPE_FILE"
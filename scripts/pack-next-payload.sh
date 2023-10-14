#!/bin/bash

script_directory="$(cd "$(dirname "$0")" && pwd)"
cd "$script_directory/../../next-payload"

# Pack the package
yarn build
yarn_pack_output=$(yarn pack)

# Helper variables
archive_file=$(echo "$yarn_pack_output" | grep -o '".*"' | awk -F '"' '{print $2}')
filename=$(basename "$archive_file")

# Move tgz into next-payload-demo directory
mv "$archive_file" "../next-payload-demo"
# Move into next-payload-demo directory
cd "../next-payload-demo"

# Remove all files in yarn cache .tmp directory
rm -rf "$(yarn cache dir)/.tmp/"*
# Install the package
yarn add ./$filename
# Cleanup the archive file
rm -rf ./$filename
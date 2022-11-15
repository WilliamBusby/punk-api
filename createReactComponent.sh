#!/bin/bash
# MAKE SURE EXECUTION PERMS ARE ON (chmod -x ./createReactComponent.sh)
# TO RUN (sh ./createReactComponent.sh)
# Component name
echo Please input a name && read NAME
# NAME="TestComponent"
# File path location (for the folder, relative to where this script is)
LOCATION="./components/"
#
# Writing to files
cd ${LOCATION}
mkdir ${NAME} && cd ${NAME}
touch "${NAME}.jsx" && touch "${NAME}.test.js" && touch "${NAME}.scss"
printf "import React from 'react';\nimport './${NAME}.scss';\n\nconst ${NAME} = (props) => {\n\n  return (\n    <div>${NAME}</div>\n  )\n}\n\nexport default ${NAME}" > ${NAME}.jsx
printf "import ${NAME} from './${NAME}';" > ${NAME}.test.js
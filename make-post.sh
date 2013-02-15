#!/bin/bash

DATE=`date +"%Y-%m-%d"`
NAME="$@"
NICE_NAME=${NAME//[ .]/-}

touch _posts/$DATE-$NICE_NAME.markdown

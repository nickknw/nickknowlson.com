#!/bin/bash

DATE=`date +"%Y-%m-%d"`
NAME="$@"
NICE_NAME=${NAME//[ .]/-}
BOILERPLATE="---\nlayout: post\ntitle: $NAME\ndescription:\n---"

echo -e $BOILERPLATE > _posts/$DATE-$NICE_NAME.markdown

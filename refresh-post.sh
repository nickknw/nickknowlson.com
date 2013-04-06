#!/bin/bash
# Call with a fragment of a post title. Example:
# ./refresh-post.sh week-3-day-2

CUR_DATE=`date +"%Y-%m-%d"`
OLD_POST=`ls -1 _posts/*$@* | head -n 1`
POST_NAME=`echo $OLD_POST | cut -c19-` # 19 = _posts/20xx-xx-xx- + 1
NEW_POST="_posts/$CUR_DATE-$POST_NAME"

echo Moved:
echo $OLD_POST
echo to:
echo $NEW_POST

mv $OLD_POST $NEW_POST

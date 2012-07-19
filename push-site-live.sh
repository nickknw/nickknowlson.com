# commit
jekyll
cp -rf _site/* ../nickknw.github.com/
cd ../nickknw.github.com/
git add .
echo "COMMIT GENERATED FILES:"
git commit -am "`date`"
cd ../nickknowlson.com/

# and push 
cd ../nickknw.github.com/
echo "PUSH GENERATED FILES:"
git push
cd ../nickknowlson.com
echo "PUSH SOURCE FILES"
git push

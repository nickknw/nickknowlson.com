jekyll
cp -rf _site/* ../nickknw.github.com/
cd ../nickknw.github.com/
git add .
echo "GENERATED FILES:"
git commit -am "`date`"
cd ../nickknowlson.com/
echo "SOURCE FILES:"


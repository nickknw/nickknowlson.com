jekyll
cp -rf _site/* ../nickknw.github.com/
cd ../nickknw.github.com/
git add .
git commit -am "`date`"
cd ../nickknowlson.com/
echo "site copied"


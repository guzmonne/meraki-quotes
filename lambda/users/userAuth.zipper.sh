echo "*********** User Auth Lambda Function ************"
echo ""
echo "**************************************************"
echo "Zipping files"
echo "**************************************************"
zip -j userAuth.zip ../models/session.model.js
zip -r userAuth.zip ./node_modules/ conapps-user-auth.js
echo ""
if [ "$1" == "--no-upload" ]; then
  echo "Not uploading file as requested"
else
	echo "************************************************"
	echo "Uploading zip to AWS"
	echo "************************************************"
	aws lambda update-function-code --function-name conapps-user-auth --zip-file fileb://userAuth.zip
fi
echo ""
echo "Done"
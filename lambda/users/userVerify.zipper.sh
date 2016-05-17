echo "*********** User Verify Lambda Function ************"
echo ""
echo "****************************************************"
echo "Zipping files"
echo "****************************************************"
zip -j userVerify.zip ../models/user.model.js
zip -r userVerify.zip ./node_modules/ conapps-user-verify.js user.helpers.js
echo ""
if [ "$1" == "--no-upload" ]; then
  echo "Not uploading file as requested"
else
	echo "****************************************************"
	echo "Uploading zip to AWS"
	echo "****************************************************"
	aws lambda update-function-code --function-name conapps-user-verify --zip-file fileb://userVerify.zip
fi
echo ""
echo "Done"
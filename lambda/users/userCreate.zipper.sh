echo "*********** User Create Lambda Function ************"
echo ""
echo "****************************************************"
echo "Zipping files"
echo "****************************************************"
zip -j userCreate.zip ../models/user.model.js
zip -r userCreate.zip ./node_modules/ conapps-user-create.js
echo ""
if [ "$1" == "--no-upload" ]; then
  echo "Not uploading file as requested"
else
	echo "****************************************************"
	echo "Uploading zip to AWS"
	echo "****************************************************"
	aws lambda update-function-code --function-name conapps-user-create --zip-file fileb://userCreate.zip
fi
echo ""
echo "Done"
echo "*********** User Change Password Lambda Function ************"
echo ""
echo "*************************************************************"
echo "Zipping files"
echo "*************************************************************"
zip -j userChangePassword.zip ../models/user.model.js
zip -r userChangePassword.zip ./node_modules/ conapps-user-changePassword.js user.helpers.js
echo ""
if [ "$1" == "--no-upload" ]; then
  echo "Not uploading file as requested"
else
	echo "*************************************************************"
	echo "Uploading zip to AWS"
	echo "*************************************************************"
	aws lambda update-function-code --function-name conapps-user-changePassword --zip-file fileb://userChangePassword.zip
fi
echo ""
echo "Done"
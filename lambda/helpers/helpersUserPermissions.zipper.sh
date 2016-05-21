echo "*********** Helpers User Permissions Lambda Function ************"
echo ""
echo "*****************************************************************"
echo "Zipping files"
echo "*****************************************************************"
zip -j helpersUserPermissions.zip ../models/helpers.model.js
zip -r helpersUserPermissions.zip ./node_modules/ conapps-helpers-userPermissions-index.js
echo ""
if [ "$1" == "--no-upload" ]; then
  echo "Not uploading file as requested"
else
	echo "*****************************************************************"
	echo "Uploading zip to AWS"
	echo "*****************************************************************"
	aws lambda update-function-code --function-name conapps-helpers-userPermissions-index --zip-file fileb://helpersUserPermissions.zip
fi
echo ""
echo "Done"
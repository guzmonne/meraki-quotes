echo "*********** Helpers User Permissions Index Lambda Function ************"
echo ""
echo "***********************************************************************"
echo "Zipping files"
echo "***********************************************************************"
zip -j helpersUserPermissionsIndex.zip ../models/helpers.model.js
zip -r helpersUserPermissionsIndex.zip ./node_modules/ conapps-helpers-userPermissions-index.js
echo ""
if [ "$1" == "--no-upload" ]; then
  echo "Not uploading file as requested"
else
	echo "***********************************************************************"
	echo "Uploading zip to AWS"
	echo "***********************************************************************"
	aws lambda update-function-code --function-name conapps-helpers-userPermissions-index --zip-file fileb://helpersUserPermissionsIndex.zip
fi
echo ""
echo "Done"
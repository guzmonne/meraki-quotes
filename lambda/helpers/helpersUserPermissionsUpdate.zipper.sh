echo "*********** Helpers User Permissions Update Lambda Function ************"
echo ""
echo "************************************************************************"
echo "Zipping files"
echo "************************************************************************"
zip -j helpersUserPermissionsUpdate.zip ../models/helpers.model.js
zip -r helpersUserPermissionsUpdate.zip ./node_modules/ conapps-helpers-userPermissions-update.js
echo ""
if [ "$1" == "--no-upload" ]; then
  echo "Not uploading file as requested"
else
	echo "************************************************************************"
	echo "Uploading zip to AWS"
	echo "************************************************************************"
	aws lambda update-function-code --function-name conapps-helpers-userPermissions-update --zip-file fileb://helpersUserPermissionsUpdate.zip
fi
echo ""
echo "Done"
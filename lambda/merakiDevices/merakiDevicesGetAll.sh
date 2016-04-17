echo "*********** ZipUpload ************"
echo ""
echo "**********************************"
echo "Zipping files"
echo "**********************************"
zip -j merakiDevicesGetAll.zip ../models/merakiDevices.model.js
zip -r merakiDevicesGetAll.zip ./node_modules/ conapps-merakiDevices-getAll.js
echo ""
if [ "$1" == "--no-upload" ]; then
  echo "Not uploading file as requested"
else
	echo "************************************************"
	echo "Uploading zip to AWS"
	echo "************************************************"
	aws lambda update-function-code --function-name conapps-merakiDevices-getAll --zip-file fileb://merakiDevicesGetAll.zip
fi
echo ""
echo "Done"

echo "*********** ZipUpload ************"
echo ""
echo "**********************************"
echo "Zipping files"
echo "**********************************"
zip -j merakiDevicesCreate.zip ../models/merakiDevices.model.js
zip -r merakiDevicesCreate.zip ./node_modules/ conapps-merakiDevices-create.js
echo ""
echo "**********************************"
echo "Uploading zip to AWS"
echo "**********************************"
aws lambda update-function-code --function-name conapps-merakiDevices-create --zip-file fileb://merakiDevicesCreate.zip
echo ""
echo "Done"

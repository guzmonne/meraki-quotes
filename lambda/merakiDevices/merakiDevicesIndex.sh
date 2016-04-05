echo "*********** ZipUpload ************"
echo ""
echo "**********************************"
echo "Zipping files"
echo "**********************************"
zip -j merakiDevicesIndex.zip ../models/merakiDevices.model.js ../models/counts.model.js
zip -r merakiDevicesIndex.zip ./node_modules/ conapps-merakiDevices-index.js
echo ""
echo "**********************************"
echo "Uploading zip to AWS"
echo "**********************************"
aws lambda update-function-code --function-name conapps-merakiDevices-index --zip-file fileb://merakiDevicesIndex.zip
echo ""
echo "Done"
echo "*********** Meraki Quotes Update Function ************"
echo ""
echo "******************************************************"
echo "Zipping files"
echo "******************************************************"
zip -j merakiQuoteUpdate.zip ../models/merakiQuotes.model.js ../models/user.model.js ../modules/auth.module.js
zip -r merakiQuoteUpdate.zip ./node_modules/ conapps-merakiQuotes-update.js
echo ""
if [ "$1" == "--no-upload" ]; then
  echo "Not uploading file as requested"
else
	echo "****************************************************"
	echo "Uploading zip to AWS"
	echo "****************************************************"
	aws lambda update-function-code --function-name conapps-merakiQuotes-update --zip-file fileb://merakiQuoteUpdate.zip
fi
echo ""
echo "Done"
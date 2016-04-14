echo "*********** Meraki Quotes Get Lambda Function ************"
echo ""
echo "**********************************************************"
echo "Zipping files"
echo "**********************************************************"
zip -j merakiQuoteGet.zip ../models/merakiQuotes.model.js ../models/user.model.js ../modules/auth.module.js
zip -r merakiQuoteGet.zip ./node_modules/ conapps-merakiQuotes-get.js
echo ""
if [ "$1" == "--no-upload" ]; then
  echo "Not uploading file as requested"
else
	echo "**********************************************************"
	echo "Uploading zip to AWS"
	echo "**********************************************************"
	aws lambda update-function-code --function-name conapps-merakiQuotes-get --zip-file fileb://merakiQuoteGet.zip
fi
echo ""
echo "Done"
echo "*********** User Auth Lambda Function ************"
echo ""
echo "**************************************************"
echo "Zipping files"
echo "**************************************************"
zip -j merakiQuoteIndex.zip ../models/merakiQuotes.model.js ../modules/auth.module.js
zip -r merakiQuoteIndex.zip ./node_modules/ conapps-merakiQuotes-index.js
echo ""
if [ "$1" == "--no-upload" ]; then
  echo "Not uploading file as requested"
else
	echo "************************************************"
	echo "Uploading zip to AWS"
	echo "************************************************"
	aws lambda update-function-code --function-name conapps-merakiQuotes-index --zip-file fileb://merakiQuoteIndex.zip
fi
echo ""
echo "Done"
echo "*********** User Auth Lambda Function ************"
echo ""
echo "**************************************************"
echo "Zipping files"
echo "**************************************************"
zip -j merakiQuoteCreate.zip ../models/merakiQuotes.model.js ../models/user.model.js ../modules/auth.module.js
zip -r merakiQuoteCreate.zip ./node_modules/ conapps-merakiQuotes-create.js
echo ""
if [ "$1" == "--no-upload" ]; then
  echo "Not uploading file as requested"
else
	echo "************************************************"
	echo "Uploading zip to AWS"
	echo "************************************************"
	aws lambda update-function-code --function-name conapps-meraki-quote-create --zip-file fileb://merakiQuoteCreate.zip --profile adminuser
fi
echo ""
echo "Done"
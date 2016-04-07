echo "*********** User Login Lambda Function ************"
echo ""
echo "***************************************************"
echo "Zipping files"
echo "***************************************************"
zip -j userLogin.zip ../models/user.model.js ../models/session.model.js
zip -r userLogin.zip ./node_modules/ conapps-user-login.js
echo ""
echo "***************************************************"
echo "Uploading zip to AWS"
echo "***************************************************"
aws lambda update-function-code --function-name conapps-user-login --zip-file fileb://userLogin.zip
echo ""
echo "Done"
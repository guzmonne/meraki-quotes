Write-Host "/*************************************************/"
Write-Host "/* INCREASE MERAKI DEVICES COUNT LAMBDA FUNCTION */"
Write-Host "/*************************************************/"
Write-Host ""
Write-Host "Compressing Files"
Write-Host "-----------------"
Compress-Archive -LiteralPath ./increase-merakiDevices-count.js, ./node_modules, ../models/counts.model.js -DestinationPath ./increaseMerakiDevices.zip -CompressionLevel Optimal -Force
Write-Host ""
Write-Host "Done!"
Write-Host ""
Write-Host "Uploading Zip to AWS"
Write-Host "--------------------"
Write-Host ""
aws lambda update-function-code --function-name conapps-counts-increase-merakiDevices --zip-file fileb://increaseMerakiDevices.zip
Write-Host ""
Write-Host "Done!"
Write-Host ""
Compress-Archive -LiteralPath ./conapps-merakiDevices-create.js, ./node_modules, ../models/merakiDevices.model.js -DestinationPath ./merakiDevicesCreate.zip -CompressionLevel Optimal -Force
aws lambda update-function-code --function-name conapps-merakiDevices-create --zip-file fileb://merakiDevicesCreate.zip
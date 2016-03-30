// require.context('./modules/', true, /\.js$/));
require('./modules/aws-sdk/lib/axios/dist/axios.standalone.js');
require('script!./modules/aws-sdk/lib/CryptoJS/rollups/hmac-sha256.js');
require('script!./modules/aws-sdk/lib/CryptoJS/rollups/sha256.js');
require('script!./modules/aws-sdk/lib/url-template/url-template.js');
require('script!./modules/aws-sdk/lib/apiGatewayCore/sigV4Client.js');
require('script!./modules/aws-sdk/lib/apiGatewayCore/apiGatewayClient.js');
require('script!./modules/aws-sdk/lib/apiGatewayCore/simpleHttpClient.js');
require('script!./modules/aws-sdk/lib/apiGatewayCore/utils.js');
require('script!./modules/aws-sdk/apigClient.js');

console.log(apigClientFactory)
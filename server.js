require('dotenv').config();
const AWS = require('aws-sdk');
const params = require('./params');

// AWS.config.update({ region: 'ap-south-1' });
AWS.config.update({ region: 'us-east-1' });

const ses = new AWS.SES({
  apiVersion: '2010-12-01',
  accessKeyId: process.env.ACCESS,
  secretAccessKey: process.env.SECRET
})

// verify the email
// var paramsVerify = {
//   EmailAddress: "tech@thecultor.com"
// };
// ses.verifyEmailIdentity(paramsVerify, function (err, data) {
//   if (err) console.log("ERROR", err, err.stack); // an error occurred
//   else console.log(data);           // successful response
// });

var sendPromise = ses.sendEmail(params).promise();

// Handle promise's fulfilled/rejected states
sendPromise.then(
  function (data) {
    console.log(data.MessageId);
  }).catch(
    function (err) {
      console.error(err, err.stack);
    });

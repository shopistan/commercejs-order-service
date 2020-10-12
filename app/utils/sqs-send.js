const generateResponse = require("./response");
const keys = require("../config/keys");
const AWS = require("aws-sdk");
// Credentials
const SESConfig = {
  // apiVersion: AWS_KEYS.API_VERSION,
  accessKeyId: keys.aws.accessKeyId,
  accessSecretKey: keys.aws.secretKey,
  region: keys.aws.region,
  secretKey: keys.aws.secretKey,
};
AWS.config.update(SESConfig);
const sqs = new AWS.SQS();
module.exports = (params) => {
  return new Promise((resolve, reject) => {
    sqs.sendMessage(params, (err, data) => {
      if (err) {
        console.log(`ERROR: Sending Message to SQS failed ${err}`);
        return reject(
          generateResponse(err, 500, "ERROR: Sending Message to SQS failed.")
        );
      } else {
        return resolve(
          generateResponse(data, 200, "Sending Message to SQS sucessful.")
        );
      }
    });
  });
};

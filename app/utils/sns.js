const AWS = require("aws-sdk");
const keys = require("../config/keys");

module.exports = (config = {}) => {
  config.isOffline = config.hasOwnProperty("isOffline")
    ? config.isOffline
    : keys.isOffline;
  let opts = {
    region: keys.aws.region,
  };

  if (config.isOffline) {
    opts = {
      ...opts,
      endpoint: keys.aws.offlineEndpoint,
    };
  } else {
    opts = {
      ...opts,
      accessKeyId: keys.aws.accessKeyId,
      secretKey: keys.aws.secretKey,
    };
  }

  return new AWS.SNS(opts);
};

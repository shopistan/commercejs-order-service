module.exports = {
  mongodb: process.env.mongodb || '',
  mongodbTest: process.env.mongodbTest || 'mongodb://localhost:27017/test',
  secret: process.env.secret || 'c6aSsUzQBACrdWoWy6g7BkuxwKfkPbmB',
  isOffline: process.env.IS_OFFLINE || false,
  aws: {
    region: process.env.awsRegion || 'us-east-1',
    accessKeyId: process.env.awsAccessKeyId || '',
    secretKey: process.env.awsSecretKey || '',
    offlineEndpoint: process.env.awsOfflineEndpoint || 'http://127.0.0.1:4002',
    awsAccountId: process.env.awsAccountId || '',

  },
  snsTopics: {
    orderCreated:
      process.env.snsCreateOrderTopic ||
      "arn:aws:sns:us-east-1:403302655770:orderCreated",
  },
};

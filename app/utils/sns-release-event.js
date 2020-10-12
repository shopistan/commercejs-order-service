const SNS = require("./sns");
const { snsTopics } = require("../config/keys");
module.exports = async (message, subject, topic) => {
  try {
    const sns = SNS();
    return await sns
      .publish({
        Message: JSON.stringify({
          message,
        }),
        Subject: subject,
        TopicArn: snsTopics[topic],
      })
      .promise()
      .then((r) => r);
  } catch (error) {
    console.log(error);
    return error;
  }
};

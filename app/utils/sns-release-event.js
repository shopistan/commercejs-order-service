const SNS = require("./sns");
const { snsTopics } = require("../config/keys");
module.exports = async (items, subject, topic) => {
  try {
    const sns = SNS();
    return await sns
      .publish({
        Message: JSON.stringify({
          items,
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

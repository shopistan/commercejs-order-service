const Order = require('../../models/Order');
const OrderItem = require('../../models/OrderItem');
const sns = require('../../utils/sns-release-event');
const sqs = require('../../utils/sqs-send');
const keys = require('../../config/keys');
const all = async () => {
    return await Order.find({});
  };
const getOrder = async (id) => {
  return await Order.findById(id);
};
const getItem = async (id) => {
    return await OrderItem.findById(id);
  };
const getItembySku = async (sku) => {
    return await OrderItem.find({ sku: sku });
  };
const count = async () => {
  let countOrders = await Order.count();
  return { count: countOrders };
};
const save = async (data) => {
    let items = [];
    data = JSON.parse(data);
    let skus = [];
    data.items.map((item) => {
        let itm = new OrderItem();
        itm.sku = item.sku;
        itm.quantity = item.quantity
        items.push(itm);
        skus.push({ sku: item.sku,  quantity: item.quantity });
    });
    let ItemResponse = await OrderItem.insertMany(items)
    let newOrder = new Order();
    newOrder.items = ItemResponse
    newOrder.status = "Created"
    newOrder.name = data.name;
    newOrder.email = data.email;
    let order ={}
    order =  await newOrder.save();
    let emailBody =  {
      to: data.email,
      body: "Yay!!! Congragulations your order created successfully",
    };
    let params = {
      MessageBody: JSON.stringify(emailBody),
      QueueUrl: `https://sqs.us-east-1.amazonaws.com/${keys.aws.awsAccountId}/emailQueue`,
    };
      let mailResponce ={};
    try {
      mailResponce = await sqs(params);
    } catch (error){
      console.log(error);
    }
      return {
        snsResponse: await sns(skus,'orderCreated','orderCreated'),
        mailResponce,
        order
      };
    };
module.exports = {
  all,
  count,
  save,
  getItem,
  getItembySku,
  getOrder
};

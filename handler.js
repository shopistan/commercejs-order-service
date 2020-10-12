"use strict";
require("./app/config/db");
const send = require("./app/utils/response");
const OrdersController = require("./app/controllers/orders");
module.exports.all = async (event) => {
  try {
    let response = await OrdersController.all();
    return send(response);
  } catch (error) {
    return send(error);
  }
};
module.exports.save = async (event) => {
  try {
    let response = await OrdersController.save(event.body);
    return send(response);
  } catch (error) {
    return send(error);
  }
};

module.exports.getItem = async (event) => {
  try {
    let response = await OrdersController.getItem(event.pathParameters.id);
    return send(response);
  } catch (error) {
    return send(error);
  }
};
module.exports.count = async (event) => {
  try {
    let response = await OrdersController.count();
    return send(response);
  } catch (error) {
    return send(error);
  }
};
module.exports.getOrder = async (event) => {
  try {
    let response = await OrdersController.getOrder(event.pathParameters.id);
    return send(response);
  } catch (error) {
    return send(error);
  }
};

const chai = require("chai");
const { expect } = chai;
chai.use(require("chai-as-promised"));
const faker = require("faker");
const OrderItem = require("../../models/OrderItem");
const Order = require("../../models/Order");
const OrdersController = require("./index");
const testHelper = require("../../utils/test.helper");

beforeEach(testHelper.setupTest);
const orderItem = new OrderItem({
  sku: faker.commerce.productName(),
  quantity: faker.random.number(),
});

const orderBody = new Order({
  name: faker.name.findName(),
  email: faker.internet.email(),
  items: [
    {
      orderItem,
    },
  ],
});

describe("Order", () => {
  describe("Create", () => {
    it("should created order",  async () => {
      let result = await OrdersController.save(JSON.stringify(orderBody));
      expect(result.order.name).to.equal(orderBody.name);
      expect(result.order.email).to.equal(orderBody.email);
    });
    it("should return order item", async () => {
      const result = await OrdersController.getItembySku(
        JSON.stringify(orderBody.items.sku)
      );
      expect(result.sku).to.equal(orderBody.items.sku);
    });
    it("should return array of orders", async () => {
      const result = await OrdersController.all();
      expect(typeof result).to.equal("object");
    });
    it("should return count of the orders", async () => {
      const result = await OrdersController.count();
      expect(typeof result.count).to.equal("number");
    });
  });
});

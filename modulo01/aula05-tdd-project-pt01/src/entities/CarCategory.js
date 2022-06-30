const Base = require("./base/Base");

module.exports = class CarCategory extends Base {
  constructor({ id, name, carIds, price }) {
    super({ id, name });

    this.carIds = carIds;
    this.price = price;
  }
};

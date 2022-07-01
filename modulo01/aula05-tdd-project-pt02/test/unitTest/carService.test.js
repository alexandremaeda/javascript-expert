const { describe, it, before } = require("mocha");
const CarService = require("../../src/service/CarService");

const { join } = require("path");

const carDatabase = join(__dirname, "./../../database", "cars.json");

describe("CarService Suite Test", () => {
  let carService = {};

  before(() => {
    carService = new CarService({ cars: carDatabase });
  });

  it("given a carCategory it should return an available car", async () => {
    const result = await carService.test(
      "75fb798a-3829-4fbf-82a1-5a27ee33ab3a"
    );
    console.log(result);
  });
});

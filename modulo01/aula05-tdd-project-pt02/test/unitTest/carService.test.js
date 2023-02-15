const { describe, it, before, beforeEach, afterEach } = require("mocha");
const CarService = require("../../src/service/CarService");

const { join } = require("path");
const sinon = require("sinon");
const { expect } = require("chai");
const carDatabase = join(__dirname, "./../../database", "cars.json");

const mocks = {
  validCarCategory: require("../mocks/valid-carCategory.json"),
  validCar: require("../mocks/valid-car.json"),
  validCustomer: require("../mocks/valid-customer.json"),
};

describe("CarService Suite Test", () => {
  let carService = {};
  let sandox = {};

  before(() => {
    carService = new CarService({ cars: carDatabase });
  });
  beforeEach(() => {
    sandox = sinon.createSandbox();
  });

  afterEach(() => {
    sandox.restore();
  });

  it("should retrieve a random postition from an array", () => {
    const data = [0, 1, 2, 3, 4];
    const result = carService.getRandomPositionFromArray(data);

    expect(result).to.be.lte(data.length).and.be.gte(0);
  });

  it("should choose the first if from carIds in carCategory", () => {
    const carCategory = mocks.validCarCategory;
    const carIndex = 0;

    sandox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carIndex);

    const result = carService.choosenRandomCar(carCategory);
    const expected = carCategory.carIds[carIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  });

  it("given a carCategory it should return an available car", async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.carIds = [car.id];

    sandox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    sandox.spy(carService, carService.choosenRandomCar.name);

    const result = await carService.getAvailableCar(carCategory);
    const expected = car;

    expect(carService.choosenRandomCar.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;
    expect(result).to.be.deep.equal(expected);
  });
});

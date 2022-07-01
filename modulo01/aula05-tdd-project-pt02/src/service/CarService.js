const BaseRepository = require("../repository/base/BaseRepository");

module.exports = class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
  }

  test(id) {
    return this.carRepository.find(id);
  }
};

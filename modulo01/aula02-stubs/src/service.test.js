const Service = require("./service");
const sinon = require("sinon");
const { deepStrictEqual } = require("assert");
const BASE_URL_1 = "https://swapi.dev/api/planets/1";
const BASE_URL_2 = "https://swapi.dev/api/planets/2";
const mocks = {
  tattoine: require("../mocks/tattoine.json"),
  alderaan: require("../mocks/alderaan.json"),
};

(async () => {
  // {
  //   // acessa a api
  //   const service = new Service();
  //   const withoutStup = await service.makeRequest(BASE_URL_2);
  //   console.log(JSON.stringify(withoutStup));
  // }

  const service = new Service();
  const stup = sinon.stub(service, service.makeRequest.name);

  stup.withArgs(BASE_URL_1).resolves(mocks.tattoine);
  stup.withArgs(BASE_URL_2).resolves(mocks.alderaan);

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearedIn: 5,
    };
    const result = await service.getPlanets(BASE_URL_1);
    deepStrictEqual(result, expected);
  }
  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearedIn: 2,
    };
    const result = await service.getPlanets(BASE_URL_2);
    deepStrictEqual(result, expected);
  }
})();

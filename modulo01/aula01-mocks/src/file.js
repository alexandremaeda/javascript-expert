const { readFile } = require("fs/promises");
const { join } = require("path");

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const isValid = File.isValid(content);

    return content;
  }

  static async getFileContent(filePath) {
    const fileName = join(__dirname, filePath);

    return (await readFile(fileName)).toString("utf8");
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const lines = csvString.split("\n");
    console.log(lines);
  }
}

(async () => {
  const result = await File.csvToJson("../mocks/threeItems-valid.csv");
  console.log(result);
})();

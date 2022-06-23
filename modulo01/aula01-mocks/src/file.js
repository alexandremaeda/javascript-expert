const { readFile } = require("fs/promises");
const { join } = require("path");
const { error } = require("./constants.js");

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

const REMOVE_BREAK_LINES_REGEX = /(\r\n|\n|\r)/gm;

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);

    if (!validation.valid) {
      throw new Error(validation.error);
    }

    return content;
  }

  static async getFileContent(filePath) {
    const fileName = join(__dirname, filePath);

    const content = (await readFile(fileName)).toString("utf8");

    return content;
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    let [header, ...fileWithoutHeader] = csvString.split("\n");

    header = header.replace(REMOVE_BREAK_LINES_REGEX, "");
    fileWithoutHeader = fileWithoutHeader.map((line) =>
      line.replace(REMOVE_BREAK_LINES_REGEX, "")
    );

    const isHeaderValid = header === options.fields.join(",");

    console.log(isHeaderValid);

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }
}

(async () => {
  const result = await File.csvToJson("../mocks/threeItems-valid.csv");
  // const result = await File.csvToJson("../mocks/invalidHeader-invalid.csv");
  console.log(result);
})();

const { readFile } = require("fs/promises");
const { error } = require("./constants.js");
const User = require("./user");

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

    const users = File.parseCSVToJSON(content);

    return users;
  }

  static async getFileContent(filePath) {
    const content = (await readFile(filePath)).toString("utf8");

    return content;
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    let [header, ...fileWithoutHeader] = csvString.split("\n");

    header = header.replace(REMOVE_BREAK_LINES_REGEX, "");
    fileWithoutHeader = fileWithoutHeader.map((line) =>
      line.replace(REMOVE_BREAK_LINES_REGEX, "")
    );

    const isHeaderValid = header === options.fields.join(",");

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    const isContentLengthAccepted =
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLines;

    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split("\n");
    const firstLine = lines.shift().replace(REMOVE_BREAK_LINES_REGEX, "");
    const header = firstLine.split(",");
    const users = lines.map((line) => {
      line = line.replace(REMOVE_BREAK_LINES_REGEX, "");
      const columns = line.split(",");
      let user = {};

      for (const index in columns) {
        user[header[index]] = columns[index];
      }

      return new User(user);
    });

    return users;
  }
}

module.exports = File;

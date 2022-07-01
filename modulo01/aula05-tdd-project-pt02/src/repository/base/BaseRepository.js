const { readFile } = require("fs/promises");

module.exports = class BaseRepository {
  constructor({ file }) {
    this.file = file;
  }

  async find(itemId) {
    const content = JSON.parse(await readFile(this.file));

    if (!itemId) return content;

    return content.find(({ id }) => id === itemId);
  }
};

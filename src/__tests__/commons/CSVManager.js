const { existsSync } = require("fs");
const CSVToJson = require("csvtojson");

class CSVManager {
  constructor(config) {
    this.file_path = config.csv_config;

    if (!existsSync(this.file_path)) {
      throw new Error("Arquivo CSV não encontrado.");
    }
  }

  async fetch() {
    return await CSVToJson({ delimiter: "auto" }).fromFile(this.file_path, {
      encoding: "utf-8",
    });
  }
}

module.exports = CSVManager;

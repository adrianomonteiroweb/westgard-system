const NavigationHandler = require("../handlers/NavigationHandler");
const Browser = require("./Browser");
const CSVManager = require("./CSVManager");

class BaseTask {
  constructor(context) {
    this.context = context;
  }

  async init() {
    console.log("Inicializando...");

    this.browser = new Browser(this.context);
    this.page = await this.browser.launch();

    this.navigation = new NavigationHandler(this.page);
    const csv_manager = new CSVManager(this.context.config);
    this.state = await csv_manager.fetch();
    console.log(this.state);
  }

  async end() {
    if (this.browser) {
      try {
        await this.browser.close();
      } catch (error) {
        log.muted(error.message);
      }
    }

    this.browser = null;
  }
}

module.exports = BaseTask;

const BaseTask = require("./commons/BaseTask");

class EndToEnd extends BaseTask {
  constructor(context) {
    super(context);
  }

  async run() {
    console.log("Acessando o site.");

    await this.navigation.goto();

    await this.page.waitForTimeout(10000);
  }
}

module.exports = EndToEnd;

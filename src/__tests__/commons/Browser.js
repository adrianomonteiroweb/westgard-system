const { chrome } = require("chrome-paths");
const { chromium } = require("playwright-core");

const executablePath =
  chrome === "google-chrome" ? "/usr/bin/google-chrome" : chrome;

class Browser {
  constructor(context) {
    this.context = context;
    this.headless = this.context.params.headless === "on";

    this.preferences = {
      plugins: {
        always_open_pdf_externally: true,
      },
    };

    this.args = ["--lang=pt-BR,pt", "--window-size=1280,900"];
  }

  async launch(options = {}) {
    const { args = [] } = options;
    console.log(this.context);
    const opts = {
      ...options,
      headless: this.headless,
      args: [...this.args, ...args],
      executablePath,
    };

    this.browser = await chromium.launch(opts);
    this.canClose = false;

    await this.browser.on("disconnected", async () => {
      if (!this.canClose) {
        throw new Error("Browser was disconnected.");
      }
    });

    this.browserContext = await this.browser.newContext({
      viewport: null,
      ignoreHTTPSErrors: true,
    });

    this.page = await this.browserContext.newPage();
    return await this.setupPage(this.page);
  }

  browser() {
    return this.browser;
  }

  async close() {
    this.canClose = true;

    if (!this.browser) {
      return;
    }

    await this.browser.close();
  }

  async setupPage(page) {
    if (this.headless) {
      await page.setViewportSize({ width: 1280, height: 900 });
    }

    const session = await page.context().newCDPSession(page);
    await session.send("Page.enable");
    await session.send("Page.setWebLifecycleState", { state: "active" });

    return page;
  }
}

module.exports = Browser;

class NavigationHandler {
  constructor(page) {
    this.page = page;
    this.baseURL = "https://laac-controle-de-qualidade-westgard.vercel.app/";
  }

  async goto(endpoint = "") {
    await this.page.goto(`${this.baseURL}/${endpoint}`);
  }
}

module.exports = NavigationHandler;

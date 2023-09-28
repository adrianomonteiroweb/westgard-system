class SystemHandler {
  constructor(page, state) {
    this.page = page;
    this.state = state;
  }

  async fillSystem() {
    await this.page.fill("#analiticSystem", this.state);
  }
}

module.exports = SystemHandler;

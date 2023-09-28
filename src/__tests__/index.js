const EndToEnd = require("./EndToEnd");
const context = require("./context.json");
const e2e = new EndToEnd(context);

(async () => {
  await e2e.init();
  await e2e.run();
})();

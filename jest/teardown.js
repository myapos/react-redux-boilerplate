const chalk = require('chalk');

module.exports = async function () {
  console.log(chalk.green('Teardown Puppeteer'));
  await global.__BROWSER_GLOBAL__.close();

  process.kill(-global.__process__.pid);
};

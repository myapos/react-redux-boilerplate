const chalk = require('chalk');
const NodeEnvironment = require('jest-environment-node');

class PuppeteerEnvironment extends NodeEnvironment {
  async setup () {
    console.log(chalk.yellow('Setup Test Environment.'));
    await super.setup();

    this.global.__BROWSER__ = global.__BROWSER_GLOBAL__;
  }

  async teardown () {
    console.log(chalk.yellow('Teardown Test Environment.'));
    await super.teardown();
  }

  runScript (script) {
    return super.runScript(script);
  }
}

module.exports = PuppeteerEnvironment;

const chalk = require('chalk');
const puppeteer = require('puppeteer');

const { spawn } = require('child_process');

module.exports = async function () {
  console.log(chalk.green('Setup Puppeteer'));

  // Your global setup
  await new Promise((resolve, reject) => {
    const maxDelay = 15000;
    let proc;
    let timer;

    try {
      proc = spawn('yarn', ['startv6'], { detached: true });
      global.__process__ = proc;

      proc.stdout.on('data', async data => {
        if (Buffer.from(data).toString().match(/compiled/ig)) {
          console.log(chalk.green('webpack dev server is ready'));

          const mode = process.env.NODE_ENV;
          console.log('mode:', mode);
          const browser = await puppeteer.launch({
            headless: mode !== 'development',
            executablePath: 'google-chrome',
          });

          // console.log('browser:', browser);
          global.__BROWSER_GLOBAL__ = browser;
          clearTimeout(timer);
          resolve();
        } else {
          console.log('webpack server is NOT compiled yet');
        }
      });

      proc.stderr.on('data', data => {
        console.log(`stderr: ${data}`);
      });

      proc.on('close', code => {
        console.log(`proc process exited with code ${code}`);
        reject();
      });

      timer = setTimeout(() => {
        console.log(chalk.red(`Webpack isn't compiled yet after ${maxDelay}s`));
        reject();
      }, maxDelay);
    } catch (e) {
      console.log('error:', e);
      // kill all node processes if there is an error
      process.kill(-proc.pid);
      reject(e);
    }
  });
};

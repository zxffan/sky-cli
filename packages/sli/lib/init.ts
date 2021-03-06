import { exec } from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';
import symbol from 'log-symbols';
import ora from 'ora';

import isNone from './utils/is_none';
import getInitQuestions from './utils/gen_init_questions';

function initRepository(): void {
  const loading = ora();
  loading.start('git repository initializing...');
  exec('git init', err => {
    if (isNone(err)) {
      loading.succeed('git repository initialize successfully');
    } else {
      loading.fail('git repository initialization failed');
    }
  });
}

function intall(): void {
  const loading = ora();
  loading.start('npm installing...');
  exec('npm install', (err, stdout, stderr) => {
    console.log(symbol.success, chalk.green(stdout));
    console.log(symbol.error, chalk.red(stderr));
    if (isNone(err)) {
      loading.succeed('npm install successfully');
    } else {
      loading.fail('npm install failed');
    }
  });
}

export default (): void => {
  inquirer.prompt(getInitQuestions()).then(answers => {
    if (answers instanceof Object && 'git' in answers) {
      const { git } = answers;
      git && initRepository();
      intall();
    }
  });
  // TODO ??� npm or yarn
  // exec('npm install', (err, stdout, stderr) => {})
};

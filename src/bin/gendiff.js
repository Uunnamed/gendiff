#!/usr/bin/env node
// @flow

import program from 'commander';
import facade from '../facade';

// let result;
program
  .version('0.0.5')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<first_config> <second_config>')
  .action((path1, path2) => {
    console.log(facade(path1, path2));
  });
program.parse(process.argv);

#!/usr/bin/env babel-node
// @flow

import program from 'commander';
import compareJSON from '../compareJSON';

// let result;
program
  .version('0.0.4')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<first_config> <second_config>')
  .action((path1, path2) => {
    console.log(compareJSON(path1, path2));
  });
program.parse(process.argv);
// console.log((result || 'Arguments for compare is not received'));

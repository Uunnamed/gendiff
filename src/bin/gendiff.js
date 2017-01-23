#!/usr/bin/env babel-node
// @flow

import program from 'commander';


program
  .usage('[options] <first_config> <second_config>')
  .arguments('<first_config> <second_config>')
  .version('0.0.3')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

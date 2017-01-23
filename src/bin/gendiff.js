#!/usr/bin/env node
// @flow

import program from 'commander';


program
  .command('gendiff <first_config> <second_config>')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

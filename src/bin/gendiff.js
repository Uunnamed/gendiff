#!/usr/bin/env babel-node
// @flow
import program from 'commander';
import getDiff from '../';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<first_config> <second_config>')
  .action((path1, path2) => {
    console.log(getDiff(path1, path2));
  });
program.parse(process.argv);

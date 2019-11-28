#!/usr/bin/env node
// @flow
import program from 'commander';
import getDiff from '..';

program
  .version('0.1.3')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format: pretty/plain/json')
  .option('-d, --diffOnly [type]', 'show only difference, default = false')
  .arguments('<first_config> <second_config>')
  .action((path1, path2) => {
    console.log(getDiff(path1, path2, program.format, { diffOnly: (program.diffOnly || false) }));
  });
program.parse(process.argv);

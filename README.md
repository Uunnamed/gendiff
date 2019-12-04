[![Code Climate](https://codeclimate.com/github/Uunnamed/gendiff/badges/gpa.svg)](https://codeclimate.com/github/Uunnamed/gendiff)
[![Test Coverage](https://codeclimate.com/github/Uunnamed/gendiff/badges/coverage.svg)](https://codeclimate.com/github/Uunnamed/gendiff/coverage)
[![Issue Count](https://codeclimate.com/github/Uunnamed/gendiff/badges/issue_count.svg)](https://codeclimate.com/github/Uunnamed/gendiff)
[![Build Status](https://travis-ci.org/Uunnamed/gendiff.svg?branch=master)](https://travis-ci.org/Uunnamed/gendiff)

-------------------------------------------------------------------------------


# gendiff - cli tool for compare two configuration files

## Install:

```
npm i gendiff_uunnamed (-g if you want use globally)

```

## Usage:

### cli:
```
user$ gendiff [options] <path_to_first_config_file> <path_to_second_config_file>

Compares two configuration files and shows a difference.

Options:
  -V, --version          output the version number
  -f, --format [type]    output format: pretty/plain/json, default = pretty
  -d, --diffOnly         show only difference, default = false
  -h, --help             output usage information
```

### lib:
```
// import genDiff from 'gendiff_uunnamed';
let genDiff = require('gendiff_uunnamed').default;
genDiff('path1', 'path2', 'pretty', { diffOnly: true });

```
### Support formats:
* json
* ini
* yaml

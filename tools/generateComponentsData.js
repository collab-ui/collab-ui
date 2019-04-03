const path = require('path');
const { createComponentsData } = require('@collab-ui/utils');

const baseDataJSON = require('./constants/BASE_DATA.json');
const dataDirectory = path.resolve(__dirname, '../data/');
const globArray = [
  path.resolve(__dirname, '../core/scss/**/*.html'),
  path.resolve(__dirname, '../core/scss/**/*.scss'),
  path.resolve(__dirname, '../react/src/lib/**/*.js'),
  // path.resolve(__dirname, '../angular/src/lib/**/*'),
  // path.resolve(__dirname, '../angularjs/src/**/*'),
];

createComponentsData(globArray, dataDirectory, baseDataJSON, true);

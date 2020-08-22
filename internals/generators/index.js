const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const moduleGenerator = require('./module');

module.exports = plop => {
  plop.setGenerator('module', moduleGenerator);
  plop.setActionType('prettify', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '/../../app/',
      config.path,
      plop.getHelper('camelCase')(answers.name),
      '**',
      '**.js',
    )}`;

    try {
      execSync(`npm run prettify -- "${folderPath}"`);
      return folderPath;
    } catch (err) {
      throw err;
    }
  });
};

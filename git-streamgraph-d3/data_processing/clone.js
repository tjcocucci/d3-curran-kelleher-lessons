const fs = require('fs');
const { exec, execSync } = require('child_process');
const depends = require('./depends');

const clone = () => {
  // read package.json
  // loop through dependencies
  console.log('dependencies', depends);

  // creating repositories directory
  let command = `mkdir repositories`;
  console.log(command);
  exec(command);

  depends.forEach((repo) => {
    let command = `git clone https://github.com/d3/${repo}.git`;
    console.log(command);
    exec(command, { cwd: './repositories' }, (error, stdout, stderr) => {});
  });
};

module.exports = clone;

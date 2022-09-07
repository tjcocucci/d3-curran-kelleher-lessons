const fs = require("fs")
const { execSync } = require("child_process")
const depends = require("./depends");

const clone = () => {
  // read package.json
  // loop through dependencies
  console.log("dependencies", depends)

  // clone each repo
  console.log("Cloning...");
  depends.forEach(repo => {
    let command = `git clone https://github.com/d3/${repo}.git`
    console.log(command);
    execSync(command, { cwd: "./repositories" }, (error, stdout, stderr) => {
      if (error) console.log(error);
    })
  })

}

module.exports = clone;

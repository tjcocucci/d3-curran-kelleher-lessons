const { exec } = require("child_process")
const depends = require("./depends");

const knife = () => {
  // creating data directory
  let command = `mkdir data`;
  console.log(command);
  exec(command);

  // clone each repo
  depends.forEach(repo => {
    console.log(repo);
    let command = `cd repositories/${repo}; git log --pretty=format:"☕%h🔪%ad🔪%an🔪%s🔪%b" --date="iso" --no-merges --compact-summary > ../../data/${repo}.001.🔪sv`
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      }
    })
  })
}

module.exports = knife;

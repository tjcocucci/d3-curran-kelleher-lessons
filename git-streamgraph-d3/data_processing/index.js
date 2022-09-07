const clone = require('./clone');
const knife = require('./knife');
const toJSON = require('./json');
const combine = require('./combine');
const aggregate = require('./aggregate');


// clone repositories
console.log("Cloning...");
clone();

// knife
console.log("knifing...");
knife();

// create JSON files
console.log("Creating JSON...");
toJSON();

// combine
console.log("Combine into one file");
combine();

// aggregate
console.log("aggregate data");
aggregate();

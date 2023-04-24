const Datastore = require("nedb-promises");
let userDB = Datastore.create("./databases/users.db");

//getAllUsers
async function getAllUsers() {
  return await userDB.find({});
}

//addUser
async function addUser({ username, password }) {
  const userObj = {
    username: username,
    password: password,
  };

  return await userDB.insert(userObj);
}

module.exports = { getAllUsers, addUser, userDB };

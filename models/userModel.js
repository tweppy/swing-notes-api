const Datastore = require("nedb-promises");
let userDB = Datastore.create("./databases/users.db");
const { v4: uuidv4 } = require("uuid");

//getAllUsers
async function getAllUsers() {
  return await userDB.find({});
}

//addUser
async function addUser(username, password) {
  const userObj = {
    username: username,
    password: password,
    userID: uuidv4(),
  };

  return await userDB.insert(userObj);
}

module.exports = { getAllUsers, addUser, userDB };

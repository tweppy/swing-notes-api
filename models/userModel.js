const Datastore = require("nedb-promises");
let userDB = Datastore.create("./databases/users.db");
const { hashPassword } = require("../utils");
const { v4: uuidv4 } = require("uuid");

//getAllUsers  ---> do I need it?
async function getAllUsers() {
  return await userDB.find({});
}

//addUser
async function addUser(credentials) {
  const password = await hashPassword(credentials.password);
  const userObj = {
    username: credentials.username,
    password: password,
    userID: uuidv4(),
  };

  return await userDB.insert(userObj);
}

//findUser
async function findUser(username) {
  return await userDB.findOne({ username: username });
}

module.exports = { getAllUsers, addUser, findUser, userDB };

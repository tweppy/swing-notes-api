const Datastore = require("nedb-promises");
let userDB = Datastore.create("./databases/users.db");
const { hashPassword } = require("../utils");
const { v4: uuidv4 } = require("uuid");

async function addUser(credentials) {
  const password = await hashPassword(credentials.password);
  const userObj = {
    username: credentials.username,
    password: password,
    userID: uuidv4(),
  };

  return await userDB.insert(userObj);
}

async function findUser(username) {
  return await userDB.findOne({ username: username });
}

async function findUserByID(userID) {
  return await userDB.findOne({ userID: userID });
}

module.exports = { addUser, findUser, findUserByID, userDB };

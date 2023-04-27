const userErrors = {
  unauthorizedUser: "Unauthorized access: UserID does not match user token.",
  invalidToken: "Invalid token.",
  invalidBody:
    "Invalid body input. Please enter a valid username and password of 3 characters or more each.",
  invalidBodyAccount: "Invalid body input. Please enter a valid userID.",
  invalidHeaders:
    "Invalid header input credentials. Please use 'Authorization' header and input correct token.",
  incorrectPassword: "Incorrect password.",
  usernameNotFound: "Invalid username: Username not found.",
  usernameTaken: "Invalid username: Username is taken.",
};

const noteErrors = {
  invalidBody: "Invalid body input.",
  invalidBodyEdited:
    "You must include userID, text and title field, even if only editing one of them. You can leave the other field empty.",
  invalidLength:
    "Invalid character length. Title length must be between 2-50 characters and text 2-300 characters. If editing a note, at least one field must be changed.",
  invalidId: "Invalid ID.",
  titleTaken:
    "A note with that title already exists. Please use a different title.",
  titleNotFound: "No match found.",
};

module.exports = { userErrors, noteErrors };

const db = require("../config/dbConnection");
const collection = require("../config/collections");
const bcrypt = require("bcrypt");

module.exports = {
  addUser: (user) => {
    const { user_name } = user;
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({ user_name })
        .then(async (data) => {
          if (!data) {
            user.password = await bcrypt.hash(user.password, 10);
            db.get()
              .collection(collection.USER_COLLECTION)
              .insertOne(user)
              .then((resp) => {
                resolve({ resp, message: "success" });
              });
          } else {
            resolve({
              message: "failed",
            });
          }
        })
        .catch((err) => reject(err));
    });
  },

  checkUser: (userInf) => {
    const { user_name, password } = userInf;

    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({ user_name })
        .then((user) => {

          if (user) {
            bcrypt.compare(password, user.password).then((resp) => {
              if (resp) {
                resolve({ user, message: "login success", status: true });
              } else {
                resolve({ user, message: "wrong password", status: false });
              }
            });
          } else {
            resolve({
              message: "user doesnt exist",
              status: false,
            });
          }
        })
        .catch((err) => {
          resolve({ message: "err messages are comming" });
        });
    });
  },
};

const user = require("../models/User");
const cart = require("../models/Cart");

export const addUser = async (email: string, password: string) => {
  try {
    const result = await user.create({ email, password });
    return result;
  } catch (err) {
    console.log(err);
    throw new Error(
      "oops! something went wrong. Could not register user to database"
    );
  }
};

export const findUser = async (email: string) => {
  try {
    let person = await user.findOne({
      where: {
        email: email,
      },
      include: [{ model: cart, attributes: ["id"] }],
    });
    return person;
  } catch (err) {
    console.log(err);
    throw new Error("DB query Error while finding user");
  }
};

const models = require("../models/index");
const usersControllers = {};
const jsonwebtoken = require("jsonwebtoken");

const {
  assertValidPasswordService,
  assertEmailIsValid,
  encryptPassword,
} = require("../services/authorization.services");


// user register

usersControllers.register = async (req, res) => {
  try {
    let userBody = req.body;
    let password = userBody.password;
    let email = userBody.email;

    // password format validation

    try {
      assertValidPasswordService(password);
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: `Invalid password. Password must be at least 8 characters long, must have at least one lower case letter, must have at least one upper case letter must have at least one number  ${error.message}`,
      });
      return;
    };

    // email format validation

    try {
      assertEmailIsValid(email);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: `Email is invalid: ${error.message}` });
      return;
    };

    const hash = encryptPassword(password);

    await models.user.create({
      email: userBody.email,
      name: userBody.name,
      surname: userBody.surname,
      password: hash,
      document: userBody.document,
      address: userBody.address,
    });
    res.send(`The user with email: ${email} has been created successfully`)
  } catch (error) {
    res.send(error);
  };
};

// user login

usersControllers.login = async (req, res) => {
  let userBody = req.body;
  let password = userBody.password;
  let email = userBody.email;
  const userFound = await models.user.findOne({
    where: { email: email, }
  });

  if (!userFound) {
    res.send("Password or email is incorrect");
    return;
  };

  const hashedPassword = encryptPassword(password);

  if (hashedPassword !== userFound.password) {
    res.send("The password is incorrect")
    return;
  };

  const secret = process.env.JWT_SECRET || '';

  if (secret.length < 10) {
    throw new Error("JWT_SECRET is not set");
  };

  const jwt = jsonwebtoken.sign({
    id_user: userFound.id_user,
    name: userFound.name,
    email: userFound.email,
    rolIdRol: userFound.rolIdRol
  }, secret);

  res.status(200).json({
    message: "Login successful",
    jwt: jwt,
  });
}

// get all user profile data (only admin)

usersControllers.findAll = async (req, res) => {
  try {
    const users = await models.user.findAll();
    return res.status(200).json(users);
  } catch (error) {
    res.send(error);
  }
};

// get current user profile data

usersControllers.findCurrentUser = async (req, res) => {
  const { authorization } = req.headers;
  const [strategy, jwt] = authorization.split(" ");
  const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
  try {
    let id = payload.id_user;
    let resp = await models.user.findAll({
      where: {
        id_user: id,
      },
    });
    res.send(resp);
  } catch (error) {
    res.send(error);
  }
}

// user modify

usersControllers.modifyCurrentUser = async (req, res) => {
  const { authorization } = req.headers;
  const [strategy, jwt] = authorization.split(" ");
  const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);


  if (req.body.email !== payload.email) {
    throw new Error("You can only modify your account")
  }

  try {
    let data = req.body;
    await models.user.update({
      name: data.name,
      surname: data.surname,
      address: data.address
    }, { where: { email: data.email } });

    const secret = process.env.JWT_SECRET || '';

    if (secret.length < 10) {
      throw new Error("JWT_SECRET is not set");
    };

    const jwt = jsonwebtoken.sign({
      id_user: payload.id_user,
      name: data.name,
      email: payload.email,
      rolIdRol: payload.rolIdRol
    }, secret);


    res.status(200).json({
      message: "Data modified successfully",
      jwt: jwt,
    });


  } catch (error) {
    res.send(error)
  }
}

// delete any user (only admin)

usersControllers.deleteUser = async (req, res) => {
  try {
    let bodyUser = req.body
    let userMail = bodyUser.email;
    console.log(userMail);
    let resp = await models.user.destroy({
      where: {
        email: userMail,
      }
    })
    if (resp === 1) {
      res.send("User deleted successfully")
    } else {
      res.send("There is not user with that email");
    }
  } catch (error) {
    res.send(error)
  }
}

// delete current user

usersControllers.deleteCurrentUser = async (req, res) => {
  const { authorization } = req.headers;
  const [strategy, jwt] = authorization.split(" ");
  const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
  let userBody = req.body;
  let password = userBody.password;
  let email = userBody.email;
  if (email !== payload.email) {
    res.send("The email is incorrect");
    return
  }
  try {
    const userFound = await models.user.findOne({
      where: { email: email, }
    });
    const hashedPassword = encryptPassword(password);
    if (hashedPassword !== userFound.password) {
      res.status(401).json({ message: "The password is incorrect" });
      return;
    }
    let resp = await models.user.destroy({
      where: {
        email: payload.email,
      }
    })
    if (resp === 1) {
      res.send("User deleted successfully")
    } else {
      res.send("The account could not be deleted");
    }
  } catch (error) {
    res.send(error)

  }
}

module.exports = usersControllers;

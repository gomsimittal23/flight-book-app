const User = require('../models/User');

// const signupUser = (req, res) => {
//     console.log(req.body);

//     res.setHeader("Content-Type", "application/json");

//     const newUser = new User({
//         ...req.body,
//     });


//     newUser.save()
//     .then(() => {
//         res.status(200).json("Added the User");
//     })
//     .catch((err) => {
//         console.log(err);
//         res.status(400).json(`Error: ${err}`);
//     })
// }

const signupUser = (req, res) => {
    console.log(req.body);
  
    res.setHeader("Content-type", "application/json");
  
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) 
      {
        return res.status(400).json("User Already Exist");
      } 
      else 
      {
        const newUser = new User({
          ...req.body,
        });

        newUser
        .save()
        .then(() => {
          res.status(200).json("Added a user");
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(`Error ${err}`);
        });
    }
  });
};

const loginUser = async (req, res) => {
    console.log(req.body);

    res.setHeader("Content-Type", "application/json");

    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if(user)
    {
        res.status(200).json({
            name: user.name,
            email: user.email
        });
    }
    else
    {
        res.status(400).json("Invalid email/password");
    }
}

module.exports = {
    signupUser,
    loginUser
}
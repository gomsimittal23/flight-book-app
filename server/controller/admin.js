const Admin = require('../models/Admin');

const createAdmin = (req, res) => {
    console.log(req.body);

    res.setHeader("Content-Type", "application/json");

    const newAdmin = new Admin({
        ...req.body,
    });

    // newAdmin.save((err) => {
    //     if(err)
    //     {
    //         console.log(err);
    //         res.status(400).json(`Error: ${err}`);
    //     }
    //     else    res.status(200).json("Added the Admin");
    // })

    newAdmin.save()
    .then(() => {
        res.status(200).json("Added the Admin");
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(`Error: ${err}`);
    })
}

const loginAdmin = async (req, res) => {
    // console.log(req.body);

    res.setHeader("Content-Type", "application/json");

    const { email, password } = req.body;

    // if(!email)
    // {
    //     res.status(400).json("please enter the email")
    // }
    // else if(!password)
    // {
    //     res.status(400).json("please enter the password")
    // }

    const admin = await Admin.findOne({ email, password });

    if(admin)
    {
        res.status(200).json({
            name: admin.name,
            email: admin.email
        });
    }
    else
    {
        res.status(400).json("Invalid email/password");
    }
}

module.exports = {
    createAdmin,
    loginAdmin
}
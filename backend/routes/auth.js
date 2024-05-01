const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_Secret = "PrashantisaGood$boy";

// Route : 1 : Create a user using : POST "api/auth". Doesnt require auth
router.post('/createuser', [
    body('name', "enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valild email").isEmail(),
    body('password', "Should have minimum length of 3 characters.").isLength({ min: 5 })
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if user with email exists
    try {
        let user = await User.findOne({ email: req.body.email });
        let success = false;
        if (user) {
            return res.status(401).json({success, error: "Email already exists." });

        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const secretPass = await bcrypt.hash(req.body.password, salt);

        // Create user
        user = await User.create({
            name: req.body.name,
            password: secretPass,
            email: req.body.email,
        });


        const data = {
            user:{
                id:user.id
            }
        }
        // Generate JWT token
        success = true;
        const jwtToken = jwt.sign(data, JWT_Secret);
        console.log({success,jwtToken})
        res.json({success,jwtToken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error occurred");
    }
}
)


// Route : 2 : Authentication a User using : Post "/api/auth/login"
router.post('/login', [
    body('email', "Enter a valild email").isEmail(),
    body('password', "Enter the password").exists()
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if user with email exists
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        let success = false;
        if (!user) {
            return res.status(400).json({success, error: "Please login with correct credentials" });
        }

        const correctUser = await bcrypt.compare(password, user.password);
        if (!correctUser) {
            return res.status(400).json({success, error: "Please login with correct credentials" });
        }
        const data = {
            user:{
                id:user.id
            }
        }

        // Generate JWT token
        const jwtToken = jwt.sign(data, JWT_Secret);
        console.log(jwtToken)
        success = true;
        res.json({success, jwtToken })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error occurred");
    }


}
)


// Route : 3 : Get logged in User details : using Post "/api/auth/login".login required.
router.get('/getuser', fetchUser, async (req, res) => {
    try {
        // console.log(`Logged In User Details ${JSON.stringify(req.user)}`)
       const userId = req.user.id;
        const userDetails = await User.findById(userId).select("-password");
        res.send(userDetails);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}
);
module.exports = router;
const { signup, login } = require('../Controllers/authController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

// router.post('/login', (req,res)=>{
//     res.send("LOGIN Successfull")
// })

router.post("/login", loginValidation, login)
router.post('/signup', signupValidation, signup)

module.exports = router;
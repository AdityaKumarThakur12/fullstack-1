const ensureAuthenticated = require('../Middlewares/auth')


const router = require('express').Router();

router.get('/',ensureAuthenticated, (req,res)=>{
    console.log("---logged in usr detail---", req.user)
   res.status(200).json([[
    {
        name: "mobile",
        price: 10000
    },
    {
        name: "tv",
        price: 10000
    }
   ]])
})

module.exports = router
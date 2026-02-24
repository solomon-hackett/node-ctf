//imports
const express = require("express");
const router = express();

//routes
router.get('/',(req,res)=>{
    res.send('shop')
})

module.exports = router;

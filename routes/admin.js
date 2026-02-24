//imports
const express = require("express");
const router = express();

//routes
router.get('/',(req,res)=>{
    res.send('admin')
})

module.exports = router;

const express=require('express')
const router = express.router();
router.get('/sign-up', async(req,res)=>{
  res.send('sign up rout')
})
module.exports= router;

const isSignedIn=(req,res,next)=>{

  if (req.session.user){
    res.send('welcome to the party')
  }
  else{
    res.redirect('/auth/sign-in')
  }
}


module.exports=isSignedIn

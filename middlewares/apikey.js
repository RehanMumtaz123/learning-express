function apikey(req,res,next){
 const api_key='1234567';
 console.log(req.query.api_key); //used to get the query written in url after the path
 const userapi=req.query.api_key
 if(userapi && ( userapi === api_key)){
     next();//ye call kerna hota hai as a func kun ke na krne se request hang hojaye gi aur load hoti rhy gi
 }
 else{
     res.json({'message':'not allowed'})
 }
}

module.exports=apikey;

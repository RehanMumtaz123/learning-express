const path= require('path')
const routers=require('express').Router();
const apikyMiddleware= require('../middlewares/apikey') //this is for single middleware;


//whole page route middleware
// routers.use(apikyMiddleware)

// render method looks for file in views folder automatically of ejs ext AND display in it browser
routers.get('/',(req,res)=>{
    res.render('index',{title:"My home"})
 })
routers.get('/about',(req,res)=>{
     res.render('about',{title:"My home"});
 })
 
 // below can download the file of the given path
routers.get('/download',(req,res)=>{
     res.download(path.join(__dirname,'about.html'))
 })
 
//since sending njson data via express thts y using json method
// routers.get('/api/products',apikyMiddleware,(req,res)=>{
//     res.json([
//         {
//             id:'123',
//             name:'man'
//         },
//         {
//             id:'321',
//             name:'woman'
//         }
//     ])
//  })


module.exports=routers;


const exp= require('express')
const path= require('path');
const ErrorHandler = require('./Errors/errorhandler');
const mainRouter= require('./Routes/index')
const productRouter= require('./Routes/product')
const app= exp();


// const apikyMiddleware= require('./middlewares/apikey');
// now applying global middleware
// app.use(apikyMiddleware)


//using middleware for json data accepted because express bydefault donot accept json type data
app.use(exp.json());

//set key value to the container 
app.set('view engine','ejs');

// using middleware
app.use(exp.static('public'));

// yhn or express yua server ko ye bata rhy ke hamry routes mojud hain ksi dusri folder me
app.use(mainRouter);
app.use(productRouter);
app.use=((req,res,next)=>{ // handling errors in express
    if (err instanceof ErrorHandler) {
        res.status(err.status).json({;
            error:{
                message:err.message,
                status:err.status
            }
        })
    }
    else{
        res.status(500).json({ // generic error
            error:{
                message:err.message,
                status:err.status
            }
        })
    }
    }
    )
app.use=((err,req,res,next)=>{ // handling errors middleware in express
        console.log('Error :',err.message);
        res.json({message:err.message})
    next();
}
)


//below middlewar eis basically use when we are sending dta by form and using traditional old method listed in the tag itself there
// app.use(exp.urlencoded({extended:false}));


const PORT = process.env.PORT || 15000
app.listen(PORT, ()=>console.log(`server is running on port ${PORT}`));
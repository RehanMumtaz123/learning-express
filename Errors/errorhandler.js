class ErrorHandler{
constructor(status,message) {
    this.status=status;
    this.message=message;
}
//static hum iss lye banaaty hain ke humen isse call krne ke lye class ka obj banaany ki zrurt nh prti
static validationError(message="All fields are required"){
        return new ErrorHandler(422,message) // making an obj of the class
}
static notFoundError(message="Not Found"){
        return new ErrorHandler(400,message) ;
}
}
module.exports=ErrorHandler;
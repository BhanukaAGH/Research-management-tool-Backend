const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

/*const list=async (res)=>{
    try {
        var data = [];
        data= await User.find({})
        console.log(data);
    } catch (error) {
        console.log(error);
    }

   
   await User.find({}).toArray(function (err, result) {
       
       if (err) throw err;
       res.json(result);
       
     });

     
}*/
const list = async (req, res) => {
    var user = [];
    user = await User.find({})
    if (!user) {
      throw new CustomError.UnauthenticatedError('No Users In the DB')
    }
    res.json({ user })
  }

module.exports=list
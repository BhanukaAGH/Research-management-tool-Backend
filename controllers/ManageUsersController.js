const User = require('../models/User')



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
const list = async (req, res) => {//get all users
    var user = [];
    user = await User.find({})
    if (!user) {
      throw new CustomError.UnauthenticatedError('No Users In the DB')
    }
    res.json({ user })
  }

  const find1 = async (req, res) => { //Find one user by ID
    var user1 = await User.findOne({_id: req.params.id})
    if (!user1) {
        throw new CustomError.UnauthenticatedError('No  Users with ID In the DB')
      }
      res.json({user1})
      console.log(user1)

  }

  const Update = async (req, res) => { //Update User

    const filter = { _id:req.params.id};
    const update = { name:req.body.name,
                     regNo:req.body.regNo,
                     email:req.body.email,
                     role:req.body.role
                    };
    const oldDocument = await User.updateOne(filter, update)
    res.json({oldDocument})
    
    if (oldDocument.acknowledged){
        console.log("update successfull");
    }else{
        console.log("update failed");
    }

  }
  const Delete = async (req, res) => { //Delete User  

    const Document = await User.deleteOne({_id: req.params.id});
    res.json({Document})
    
    if (Document.acknowledged){
        console.log("Delete successfull");
    }else{console.log("Delete Failed");}
  

  }
 
module.exports={list,find1,Update,Delete}

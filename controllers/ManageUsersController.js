const User = require('../models/User')
const CustomError = require('../errors')

const list = async (req, res) => {//get all users

    const user=await User.find({})
    if (!user) {
      throw new CustomError.UnauthenticatedError('No Users In the DB')
   }
    res.json(user) 
  }

  const find1 = async (req, res) => { //Find one user by ID
    const user1 = await User.findOne({_id: req.params.id})
    if (!user1) {
        throw new CustomError.UnauthenticatedError('No  Users with ID In the DB')
      }
      res.json(user1)
      //console.log(user1)

  }

  const Update = async (req, res) => { //Update 1 User

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
  const Delete = async (req, res) => { //Delete 1 User  

    const Document = await User.deleteOne({_id: req.params.id});
    res.json({Document})
    
    if (Document.acknowledged){
        console.log("Delete successfull");
    }else{console.log("Delete Failed");}
  

  }

  const DeleteM = async (req, res) => { //Delete many Users
    
    let arr = req.params.ids.split(',');

    //console.log(arr);
    const Document=await User.deleteMany({'_id':{'$in':arr}});
    res.json(Document);
    if (Document.acknowledged){
        console.log("Delete successfull");
    }else{console.log("Delete Failed");}
  }
module.exports={list,find1,Update,Delete,DeleteM}
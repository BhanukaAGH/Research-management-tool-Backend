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
  const findby= async (req,res)=>{
    //find user by field for filter
    const users=await User.find({role:req.params.role})
    if (!users) {
      throw new CustomError.UnauthenticatedError('No  Users with ID In the DB')
    }
    res.json(users)

  }

  const Update = async (req, res) => { //Update 1 User
    const { name, regNo, email, role } = req.body
    // if (!name || !regNo || !email || !role) {
    //   throw new CustomError.BadRequestError('Please provide all values')
    // }

    const filter = { _id:req.params.id};
    const update = { name,
                     regNo,
                     email,
                     role
                    };
    
    const id=req.params.id;
    const prevEmail=await User.findOne({id});
    const newEmail=email;
    
  //  console.log("new email",newEmail);
  // console.log("prev email",prevEmail.email);

      async function updateUser(){
        const oldDocument = await User.updateOne(filter, update)
        res.json({oldDocument})
        
        if (oldDocument.acknowledged){
            console.log("update successfull");
        }else{
            console.log("update failed");
        }
    }
    updateUser();
                    
    // if(newEmail!==prevEmail.email){
    //   //console.log("emails not equal")
    //   const emailAlreadyExists = await User.findOne({ email })
    //   if (emailAlreadyExists) {
    //     throw new CustomError.BadRequestError('Email already exists')
    //   }
    //   updateUser();
      
    // }else{
    //   //console.log("emails equal")
    //   updateUser();
    // }
  }


  const Delete = async (req, res) => { //Delete 1 User  

    const Document = await User.deleteOne({_id: req.params.id});
    res.json({Document})
    
    if (Document.acknowledged){
        console.log("Delete successfull");
    }else{console.log("Delete Failed");}
  

  }

  const DeleteM = async (req, res) => { //Delete many Users
    
    const arr = req.params.ids.split(',');

    //console.log(arr);
    const Document=await User.deleteMany({'_id':{'$in':arr}});
    res.json(Document);
    if (Document.acknowledged){
        console.log("Delete successfull");
    }else{console.log("Delete Failed");}
  }
module.exports={list,find1,Update,Delete,DeleteM,findby}
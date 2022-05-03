const SubmissionTypes = require('../models/SubmissionTypes')
const CustomError = require('../errors')

const Create = async (req, res) => {//
    var { name, dueDate, type, description } = req.body

    if (!name || !dueDate || !type) {
        throw new CustomError.BadRequestError('Please provide all values')
      }

    
    const submission=await SubmissionTypes.findOne({name});
      if(submission){
         throw new CustomError.UnauthenticatedError('subission with name already exists')
      }

    
     const subtype = await SubmissionTypes.create({ name, dueDate, type, description});
      console.log(subtype);
     if(subtype){
         console.log("subtype created successfully");
     }else{
        console.log("failed to create");
     }
   
        res.json(subtype) 
  }
  const Remove = async (req, res) => { //remove submission type  

    const Document = await SubmissionTypes.deleteOne({_id: req.params.id});
    res.json({Document})
    
    if (Document.acknowledged){
        console.log("Delete successfull");
    }else{console.log("Delete Failed");}
  

    
  }
  const list = async (req, res) => {//get all submission types

    const submissions=await SubmissionTypes.find({})

    if (!submissions) {
      throw new CustomError.UnauthenticatedError('No submissions In the DB')
   }
   
    res.json(submissions) 
  }

  const findbyname= async (req,res)=>{//fileter by name
    //find user by field for filter
    const submissions=await SubmissionTypes.find({name:req.params.name})
    if (!submissions) {
      throw new CustomError.UnauthenticatedError('No  submissons with name:'+req.params.name)
    }
    res.json(submissions)

  }
  const findbydate= async (req,res)=>{//fileter by date
    //find user by field for filter
    const submissions=await SubmissionTypes.find({name:req.params.date})
    if (!submissions) {
      throw new CustomError.UnauthenticatedError('No  submissons on date:'+req.params.date)
    }
    res.json(submissions)

  }
  const Update = async (req, res) => { //Update duedate and description of submission type
    const {dueDate,description} = req.body

    const filter = { _id:req.params.id};
    const update = { dueDate,description};
    
      async function updatesub(){
        const oldDocument = await SubmissionTypes.updateOne(filter, update)
        res.json({oldDocument})
        
        if (oldDocument.acknowledged){
            console.log("update successfull");
        }else{
            console.log("update failed");
        }
    }
    updatesub();

  }





module.exports={Create,Remove,list,findbyname,findbydate,Update}

const CustomError = require('../errors')
const markScheme= require('../models/markScheme')

const Create=async(req,res)=>{//create marckscheme
    const {markSchemeName,Description,schemeType}=req.body

    if (!markSchemeName ) {
        throw new CustomError.BadRequestError('Please provide name')
    }

    const check=await markScheme.findOne({markSchemeName});
      if(check){
         throw new CustomError.UnauthenticatedError('Markscheme with name already exists')
      }
    
    const create = await markScheme.create({markSchemeName,Description,schemeType});
    res.json(create) 
}

const add=async(req,res)=>{//add more criteria
    const {criteria,allocatedMark}=req.body

    const filter = { _id:req.params.id};
    const update=await markScheme.findByIdAndUpdate(filter,
        {$push:{"markScheme":{criteria : criteria , allocatedMark : allocatedMark}}},
        {safe: true, upsert: true, new : true}
        );
    
    res.json(update);

}




module.exports={Create,add}
const mongoose = require('mongoose')

const MarkSchemeSchema=mongoose.Schema({
    
    markSchemeName: {
        type: String,
        required: true,
      },
    Description: {
        type: String,
    },
    markScheme: [
        {
            criteria:{
                type:String,
                trim:true,
                required:[true, 'Please provide criteria']
            },
            allocatedMark:{
                type:Number,
                required:[true, 'Please provide  AllocatedMark']
            }
        },
    ],
},{ timestamps: true})

module.exports = mongoose.model('MarkScheme', MarkSchemeSchema)
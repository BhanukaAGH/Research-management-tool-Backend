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
                //required:[true, 'Please provide criteria'],
                default: 'empty',
            },
            allocatedMark:{
                type:Number,
                //required:[true, 'Please provide  AllocatedMark'],
                default: 0,
            }
        },
    ],
    schemeType: {
        type: String,
        enum: ['document', 'presentation'],
        required: [true, 'Please provide schema type'],
      },
},{ timestamps: true})

module.exports = mongoose.model('MarkScheme', MarkSchemeSchema)



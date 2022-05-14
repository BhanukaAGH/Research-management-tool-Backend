const mongoose = require('mongoose')

const SubTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
      },
    dueDate: {
        type: String,
        required: [true, 'Please provide Date']
      },
      type: {
        type: String,
        required: [true, 'Please provide Type'],
        minlength: 3,
        maxlength: 50,
      },
      description: {
        type: String,
        minlength: 3,
        maxlength: 50,
      },
      
    },
    { timestamps: true }
  );
  

module.exports = mongoose.model('SubmissionTypes', SubTypeSchema)
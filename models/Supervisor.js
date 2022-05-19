const mongoose = require('mongoose')

const SupervisorSchema = new mongoose.Schema({
  supervisorName: {
    type: 'String',
    trim: true,
    required: [true, 'Please provide supervisor name'],
  },
  researchArea: {
    type: 'String',
    trim: 'true',
    required: [true, 'Please provide research area'],
  },
})

module.exports = mongoose.model('Supervisor', SupervisorSchema)

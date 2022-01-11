const mongoose = require('mongoose')
const Schema = mongoose.Schema
const chatMessageSchema = Schema({
  _id: Schema.Types.ObjectId,
  message: {
    type: String, //name of chatroom
    required: 'Message is required!'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'User is required!'
  },
  chatRoom: {
    type: Schema.Types.ObjectId,
    ref: 'ChatRoom',
    required: 'Chat Room Id is required!'
  },
  deletedInfo: {
    type: Array
    //[{
    //  user: "asdasds",
    //  deletedAt: "time stamp",
    //  deletedType: "for_me"
    //}]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  }
})

module.exports = mongoose.model('ChatMessage', chatMessageSchema)

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reportChatRoom = Schema({
  _id: Schema.Types.ObjectId,
  message: {
    type: String, //name of chatroom
    required: 'Message is required!'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'User is required!'
  },
  chatRoom: {
    type: Schema.Types.ObjectId,
    ref: 'ChatRoom',
    required: 'Chat Room Id is required!'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  },
  deletedAt: {
    type: Date,
    default: null
  }
})

module.exports = mongoose.model('ReportChatRoom', reportChatRoom)

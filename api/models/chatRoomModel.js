const mongoose = require('mongoose')
const Schema = mongoose.Schema
const chatRoomSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String //name of chatroom
  },
  type: {
    type: String,
    trim: true,
    enum: ['one_to_one', 'many_to_many'],
    default: 'one_to_one'
  },
  chatWith: {
    type: String,
    trim: true,
    enum: ['friends_only', 'public'],
    default: 'public'
  },
  userIds: {
    type: Array //array of user ids which belong to this group
  },
  adminUserIds: {
    type: Array //array of admins
  },
  mutedUserIds: {
    type: Array
  },
  lockedUserIds: {
    type: Array
    //user ids who have locked the chat
  },
  blockedUserIds: {
    type: Array
    //user ids who have blocked the chat
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'Created By User is required!'
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

module.exports = mongoose.model('ChatRoom', chatRoomSchema)

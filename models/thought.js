const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reaction',
    },
  ],
});

// Virtual to get reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = thought;
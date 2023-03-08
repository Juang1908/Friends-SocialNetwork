const { Schema, model, Types, trusted } = require('mongoose');
// Execute exact date and time
const moment= require('moment');

// Creating Schema
const reactionSchema = new Schema (
{
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => Types.ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    usename: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtValue => moment(createdAtValue).format('MMMM Do YYYY, h:mm:ss a'),
    },
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
)

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtValue => moment(createdAtValue).format('MMMM Do YYYY, h:mm:ss a'),
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false,
      }
)

// Create a virtual property `reactionCount` that gets the amount of comments per user
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.tags.length;
  });

  // Initialize our Tought model
  const Thought = model('Thought', thoughtSchema);
  module.exports = Thought;
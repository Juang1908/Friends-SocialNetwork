const { Schema, model, Types } = require('mongoose');

// Creating Schema for User
const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
          'Please enter a valid E-mail address',
        ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Creating a virtual friendCount to retrive the length of users friends
userSchema
.virtual('friendCount')
// Getter
.get(function () {
    return this.friends.length;
});

// Initiate User Model
const User = model('User', userSchema);
module.exports = User;
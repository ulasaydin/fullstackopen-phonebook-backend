const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3, // Minimum length of 3 characters
    required: true,
  },
  number: {
    type: String,
    minlength: 8, // Minimum length of 8 characters
    validate: {
      validator: function (v) {
        return /(^\d{2}-\d{6})|(^\d{3}-\d{5})|(^\d+$)/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: true,
  },
});

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", phonebookSchema);

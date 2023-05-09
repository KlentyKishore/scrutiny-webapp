var mongoose = require("mongoose");
const { String,Number ,ObjectId} = mongoose.Schema.Types;


const EditAccessSchema = new mongoose.Schema(
  {
    email:{
        type: String,
    },
    questionId:{
        type: ObjectId,
        ref: "Question",
    },
    acessGiven:{
        type: Boolean,
        default:false,
    }
  },
  { timestamps: true }
);


const EditAccess = mongoose.models.EditAccess || mongoose.model("editaccess", EditAccessSchema);

module.exports =EditAccess;

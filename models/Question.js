var mongoose = require("mongoose");
const { String,Number ,ObjectId} = mongoose.Schema.Types;


const QuestionSchema = new mongoose.Schema(
  {

    userId:{
      type: ObjectId,
      ref: "User",
    },
    feature:{
      type:String,
      required:true,
    },
    impactRegion:{
      type:String,
      required:true
    },
    notes:{
      type:String,
      required:true
    },
    editAccess:{
      type:Array
    },
    parentFolderId:{
      type: ObjectId,
      ref:"ImpactFolder",
    },
    subFolderId:{
      type: ObjectId,
      ref:"ImpactFolder",
    }
  },
  { timestamps: true }
);


const Question = mongoose.models.Question || mongoose.model("Question", QuestionSchema);

module.exports =Question;

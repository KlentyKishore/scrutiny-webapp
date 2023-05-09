var mongoose = require("mongoose");
const { String,ObjectId} = mongoose.Schema.Types;


const FolderSchema = new mongoose.Schema(
  {

    folderName:{
      type:String,
      required:true,
    },
    isParent:{
      type:Boolean,
      required:true
    },
    parentId:{
        type: ObjectId

    }
  },
  { timestamps: true }
);


const Folder = mongoose.models.ImpactFolder || mongoose.model("ImpactFolder", FolderSchema);

module.exports =Folder;

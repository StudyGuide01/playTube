import mongoose from "mongoose";


//commentSchema
const replySchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message:{type:String,required:true},
  createdAt:{type:Date, default: Date.now},
  updatedAt:{type:Date}
},{_id:true});

//commentsSchema
const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message:{type:String,required:true},
  replies:{replySchema},
  createdAt:{type:Date, default: Date.now},
  updatedAt:{type:Date}
},{_id:true});

const postSchema = new mongoose.Schema(
  {
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image:{
        type:String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
   
    comments: { commentSchema },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);
export default PostModel;

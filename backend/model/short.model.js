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

const shortSchema = new mongoose.Schema(
  {
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    shortUrl: {
      type: String,
      required: true,
    },
    tags: [{ type: String }],
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    saveBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: { commentSchema },
  },
  { timestamps: true }
);

const ShortModel = mongoose.model("Short", shortSchema);
export default ShortModel;

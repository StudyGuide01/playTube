import mongoose from "mongoose";


//commentSchema
const replySchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message:{type:String},
  createdAt:{type:Date, default: Date.now},
  updatedAt:{type:Date}
},{_id:true});

//commentsSchema
const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message:{type:String},
  replies:{replySchema},
  createdAt:{type:Date, default: Date.now},
  updatedAt:{type:Date}
},{_id:true});

const videoSchema = new mongoose.Schema(
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
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnail: {
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

const VideoModel = mongoose.model("Video", videoSchema);
export default VideoModel;

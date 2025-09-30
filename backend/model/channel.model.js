import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    category:{
        type:String,
        required:true
    },
    banner:{
        type:String,
        default:""
    },
    avatar:{
        type:String,
        default:""
    },
    subscribers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    videos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
      shorts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Short"
        }
    ],
      playlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"PlayList"
        }
    ],
         communityPost:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ],
},{timestamps:true})

const ChannelModel = mongoose.model('Channel',channelSchema);
export default ChannelModel;
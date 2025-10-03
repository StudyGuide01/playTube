import uploadOnCloudinary from "../config/cloudinary.js";
import ChannelModel from "../model/channel.model.js";
import VideoModel from "../model/video.model.js";

export const createVideo = async(req, res)=>{
    try {
        const {title, description, tags,channelId} = req.body;

        
        if(!title || !req.files.video || !req.files.thumbnail || !channelId){
            return res.status(400).json({message:'Title, description, videourl, channelId is required'})
        }

        const channel = await ChannelModel.findById(channelId);

        if(!channel){
            return res.status(404).json({message:'Channel not found',success:false});
        };

        const uploadVideo = await uploadOnCloudinary(req.files.video[0].path);
        const thumbnail = await uploadOnCloudinary(req.files.thumbnail[0].path);

        let parsedTag  = [];
      if(tags){
          try {
            parsedTag = JSON.parse(tags);
        } catch (error) {
            parsedTag = [];
        }
      }

      const newVideo = await VideoModel.create({
        channel:channel._id,
        title,
        description,
        tags:parsedTag,
       videoUrl:uploadVideo,
        thumbnail:thumbnail
      });

      //add video id in channel 
      await ChannelModel.findByIdAndUpdate(channel._id,
        {$push : {videos:newVideo._id}},
        {new:true}
    )

    return res.status(201).json({message:'video created successfully',newVideo,success:true});

    } catch (error) {
        console.log('While create video ',error);
        return res.status(500).json({message:'Internal server error',success:false});
    }
}
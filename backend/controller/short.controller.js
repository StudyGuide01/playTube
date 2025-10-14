import uploadOnCloudinary from "../config/cloudinary.js";
import ChannelModel from "../model/channel.model.js";
import ShortModel from "../model/short.model.js";

export const createShort = async (req, res) => {
  try {
    const { title, description, tags, channelId } = req.body;

    // Validate required fields
    if (!title || !channelId) {
      return res
        .status(400)
        .json({ success: false, message: "Title and channelId are required" });
    }

    // Validate channel
    const channelData = await ChannelModel.findById(channelId);
    if (!channelData) {
      return res
        .status(404)
        .json({ success: false, message: "Channel not found" });
    }

 

    // Handle file upload
   
    let shortFileUrl;
    if (req.file) {
      const uploaded = await uploadOnCloudinary(req.file.path);
      if (!uploaded) {
        return res
          .status(500)
          .json({ success: false, message: "Cloud upload failed" });
      }
    //   shortFileUrl = uploaded.url;
    shortFileUrl = uploaded

    }


    
  
    // Handle tags parsing
    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags);
      } catch {
        parsedTags = tags.split(",").map((t) => t.trim());
      }
    }

  
    
    // Create short
    const newShort = await ShortModel.create({
      channel: channelData._id,
      title,
      description,
      tags: parsedTags,
      shortUrl: shortFileUrl,
    });

    // Link to channel
    channelData.shorts.push(newShort._id);
    await channelData.save();

    return res.status(201).json({
      success: true,
      message: "Short created successfully",
      data: newShort,
    });

   
  } catch (error) {
    console.error("Error while creating short:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


//get all shorts 
export const getAllShorts = async (req, res) => {
  try {
    // Fetch all videos and sort by creation date (newest first)
    const shorts = await ShortModel.find().sort({ createdAt: -1 }).populate('channel');

    if (!shorts || shorts.length === 0) {
      return res.status(404).json({
        message: 'No videos found',
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      shorts,
    });
  } catch (error) {
    console.log('Error while getting videos:', error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

import uploadOnCloudinary from "../config/cloudinary.js";
import ChannelModel from "../model/channel.model.js";
import UserModel from "../model/user.model.js";

export const createChannel = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    let avatar;
    let banner;
    const userId = req.id;
    const existsChannel = await ChannelModel.findOne({ owner: userId });
    if (existsChannel) {
      return res
        .status(400)
        .json({ message: "user already have a channel", success: false });
    }

    const nameExists = await ChannelModel.findOne({ name });

    if (nameExists) {
      return res
        .status(400)
        .json({ message: "channel name aready taken", success: false });
    }

    if (req.files?.avatar?.[0]) {
      avatar = await uploadOnCloudinary(req.files.avatar[0].path);
    }

    if (req.files?.banner?.[0]) {
      banner = await uploadOnCloudinary(req.files.banner[0].path);
    }

    const channel = await ChannelModel.create({
      name,
      description,
      category,
      avatar,
      banner,
      owner: userId,
    });

    await UserModel.findByIdAndUpdate(userId, {
      channel: channel._id,
      userName: name,
      photoUrl: avatar,
    });

    return res
      .status(201)
      .json({ message: "Channel created", channel, success: true });
  } catch (error) {
    console.log("While create channel", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//get channel
export const getChannel = async (req, res) => {
  try {
    const userId = req.id;
    const channel = await ChannelModel.findOne({ owner: userId }).populate({
      path: "owner",
      select: "-password",
    });
    if (!channel) {
      return res
        .status(404)
        .json({ message: "Channel is not found", success: false });
    }

    return res.status(200).json({ success: true, channel });
  } catch (error) {
    console.log("While get channel", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//update channel
export const updateChannel = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const userId = req.id;
    let channel = await ChannelModel.findOne({ owner: userId });
    if (!channel) {
      return res
        .status(400)
        .json({ message: "channel not found to update ", success: false });
    }

    if (name && name !== channel.name) {
      const nameExists = await ChannelModel.findOne({ name });

      if (nameExists) {
        return res
          .status(400)
          .json({ message: "channel name aready taken", success: false });
      }
      channel.name = name;
    }
    if (description !== undefined) {
      channel.description = description;
    }

    if (category !== undefined) {
      channel.category = category;
    }
 if (req.files?.avatar?.[0]) {
     const avatar = await uploadOnCloudinary(req.files.avatar[0].path);
     channel.avatar = avatar;
    }

    if (req.files?.banner?.[0]) {
    const   banner = await uploadOnCloudinary(req.files.banner[0].path);
      channel.banner = banner;
    }

     channel = await channel.save();

      await UserModel.findByIdAndUpdate(userId, {
      userName: name || 'set channel name',
      photoUrl: channel.avatar || 'set your channel avatar',
    },{new:true});

    return res.status(200).json({success:true,channel});

  } catch (error) {
      console.log("While update channel", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



// Subscribe or Unsubscribe
export const subscribe = async (req, res) => {
  try {
    const userId = req.id;
    const { channelId } = req.params;

    // Step 1: Find the channel
    const channel = await ChannelModel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found", success: false });
    }

    // Step 2: Check if already subscribed
    const isSubscribed = channel.subscribers.includes(userId);

    if (isSubscribed) {
      //  Unsubscribe
      channel.subscribers.pull(userId);
      await channel.save();
      return res
        .status(200)
        .json({ message: "Unsubscribed successfully", success: true, channel });
    } else {
      //  Subscribe
      channel.subscribers.push(userId);
      await channel.save();
      return res
        .status(200)
        .json({ message: "Subscribed successfully", success: true, channel });
    }
  } catch (error) {
    console.log("While subscribing/unsubscribing channel:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

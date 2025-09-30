import uploadOnCloudinary from "../config/cloudinary.js";
import ChannelModel from "../model/channel.model.js";
import UserModel from "../model/user.model.js";

export const createChannel = async(req, res)=>{
    try {
        const {name, description, category} = req.body;
        let avatar;
        let banner;
        const userId = req.id;
        const existsChannel = await ChannelModel.findOne({owner:userId});
        if(existsChannel){
            return res.status(400).json({message:'user already have a channel',success:false});
        };

        const nameExists = await ChannelModel.findOne({name});

        if(nameExists){
            return res.status(400).json({message:'channel name aready taken',success:false});
        };

        if(req.files?.avatar){
            avatar = await uploadOnCloudinary(req.files.avatar);
        }

        if(req.files?.banner){
            banner = await uploadOnCloudinary(req.files.banner);
        }

        const channel = await ChannelModel.create({
            name,
            description,
            category,
            avatar,
            banner,
            owner:userId
        });

        await UserModel.findByIdAndUpdate(userId,{
            channel:channel._id,
            userName:name,
            photoUrl:avatar
        });

        return res.status(201).json({message:'Channel created',channel,success:true});

    } catch (error) {
         console.log("While create channel", error);
    return res.status(500).json({ message: "Internal Server Error" });
    }
}
const { cloudinary } = require('../utils/cloudinary');
const UserImage = require("../models/userimage")



exports.imageWithId =  async (req, res) => {
    // const { resources } = await cloudinary.search
    //     .expression('folder:dev_setups')
    //     .sort_by('public_id', 'desc')
    //     .max_results(30)
    //     .execute();

    // const publicIds = resources.map((file) => file.public_id);
    if(req.params.userId){
        const imagesData = await UserImage.find({userId:req.params.userId})
         res.status(201).send(imagesData);
    }else{
        res.status(500).send({msg:"Please refresh page", isSuccess:false})
    }
};
exports.imageUpload = async (req, res) => {
    try {
        const fileStr = req.body.fileStr;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        });
        const data = {
            image_url:uploadResponse.public_id,
            userId:req.body.id
        }
        // console.log(uploadResponse);
        const user_image = await UserImage.create(data);
        console.log("data====",user_image);
        res.status(200).json({ msg: 'success', data:user_image });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
};


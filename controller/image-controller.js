import File from '../models/file.js';
import dotenv from 'dotenv';

dotenv.config();

export const uploadImage = async (request, response) => {
    const fileObj = {
        path: request.file.path,
        name: request.file.originalname,
    }
    
    try {
        const file = await File.create(fileObj);
        response.status(200).json({ path: `${process.env.BASE_URL}file/${file._id}`});
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message });
    }
}


export const downloadImage = async (req,res) => {
   try{
 const file = await File.findById(req.params.fileId);
 file.downloadContent++;

 await file.save();
 res.download(file.path,file.name);
   }
   catch(error){
      console.error(error.message);
      res.status(500).json({
         message:"something went wrong"
      })
   }
}
import File from '../models/file.js';
import dotenv from 'dotenv';

dotenv.config();

// **************************** Upload Image ***************************
export const uploadImage = async (request, response) => {

    try {

        const file = request.file


        // get the exptenstion of the file
        const originalName = file.originalname
        const parts = originalName.split('.')
        const extenstion = parts[parts.length - 1]

        // check whether file type is supported or not
        const supportedType = ['png', 'jpeg', 'jpg', "pdf"];

        const isFileTypeSupport = supportedType.includes(extenstion.toLowerCase());

        if (!isFileTypeSupport) {
            return res.status(422).json({ success: false, message: "file type is not supported! Only png, jpeg and jpg support." })
        }
        

        // store into the DB
        const fileObj = {
            path: file.path,
            name: file.originalName,
        }

        const fileDoc = await File.create(fileObj);

        return response.status(200).json({ path: `${process.env.BASE_URL}file/${fileDoc._id}` });
    } catch (error) {
        console.error("Error in upload image controller", error.message);
        return response.status(500).json({ error: error.message });
    }
}


// **************************** Download Image ***************************
export const downloadImage = async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId);

        // file is not found
        if (!file) {
            return res.status(500).json({
                success: false,
                message: "file is not found!",
            })
        }

        file.downloadContent++;  // download counts

        await file.save();

        return res.status(200).download(file.path, file.name).json({
            message: "File fetched successfully!", file: file
        });
    }
    catch (error) {
        console.error("Error in download image controller", error.message);
        return res.status(500).json({
            message: "something went wrong",
            error: error.message
        })
    }
}
const { S3Client, PutObjectCommand }= require("@aws-sdk/client-s3")
const { generateRandomNumber } = require("../utils/constants")


const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const bucketAccessKey = process.env.BUCKET_ACCESS_KEY;
const bucketSecretKey = process.env.BUCKET_SECRET_KEY;

const s3Client = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: bucketAccessKey,
        secretAccessKey: bucketSecretKey,
    }
});

const uploadFile = async (file) => {
    try {
        const filename = generateRandomNumber()+file.originalname.replace(/\s/g, '');
        
        const params = {
            Bucket: bucketName,
            Key: filename,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        await s3Client.send(new PutObjectCommand(params));
        return filename;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    uploadFile
}
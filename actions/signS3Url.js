const config = require('config');
const aws = require('aws-sdk');

module.exports = async (filename, filetype) => {
  const s3 = new aws.S3({
    accessKeyId: config.get('AWS_ACCESS_KEY'),
    secretAccessKey: config.get('AWS_ACCESS_SECRET'),
  });
  const s3Params = {
    Bucket: config.get('AWS_S3_BUCKET'),
    Key: filename,
    ContentType: filetype,
    ACL: 'public-read',
    Expires: 60,
  };

  return s3.getSignedUrl('putObject', s3Params);
};

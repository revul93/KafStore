const config = require('config');
const aws = require('aws-sdk');

const s3Delete = async (url) => {
  const s3 = new aws.S3({
    accessKeyId: config.get('AWS_ACCESS_KEY'),
    secretAccessKey: config.get('AWS_ACCESS_SECRET'),
  });

  s3.deleteObject(
    {
      Bucket: config.get('AWS_S3_BUCKET'),
      Key: url.split('/')[3],
    },
    (err, data) => {
      if (err) {
        console.error(err.message);
      }
      return data;
    }
  );
};

module.exports = s3Delete;

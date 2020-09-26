import axios from 'axios';
const AWS_BUCKET = 'kafstore';

const s3Upload = async (file, type) => {
  const filename = `${type}-${Date.now()}-${file.name}`;
  try {
    const signedUrl = await axios.get(
      '/api/utils/sign_url?filename=' +
        encodeURI(filename) +
        '&filetype=' +
        encodeURI(file.type)
    );

    await axios.put(signedUrl.data, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    return `https://${AWS_BUCKET}.s3-eu-west-1.amazonaws.com/${filename}`;
  } catch (error) {
    console.error(error.message);
    return '';
  }
};

export default s3Upload;

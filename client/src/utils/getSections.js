import axios from 'axios';
const getSections = async () => {
  try {
    const response = await axios.get(`/api/static/sections`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};

export default getSections;

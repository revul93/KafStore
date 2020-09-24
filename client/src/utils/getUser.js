import axios from 'axios';
const getUser = async (user_id) => {
  try {
    const response = await axios.get(`/api/user/${user_id}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
};

export default getUser;

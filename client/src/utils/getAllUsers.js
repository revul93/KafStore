import axios from 'axios';
const getAllUsers = async (token) => {
  try {
    const response = await axios.get(`/api/user/all`, {
      headers: { 'x-auth-token': token },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getAllUsers;

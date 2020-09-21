import axios from 'axios';
const getMe = async (token) => {
  try {
    const response = await axios.get(`/api/user/me`, {
      headers: {
        'x-auth-token': token,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
};

export default getMe;

import axios from 'axios';

const updateUser = async (token, data) => {
  await axios.put('/api/user/edit', data, {
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  });
};

export default updateUser;

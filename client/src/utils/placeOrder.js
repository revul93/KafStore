import axios from 'axios';
const placeOrder = async (data) => {
  try {
    const response = await axios.post(`/api/order`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': data.token,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export default placeOrder;

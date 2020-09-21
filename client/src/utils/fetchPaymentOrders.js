import axios from 'axios';
const fetchPaymentOrders = async (token) => {
  try {
    const response = await axios.get(`/api/order/payment-orders`, {
      headers: {
        'Content-Type': 'application/json',
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

export default fetchPaymentOrders;

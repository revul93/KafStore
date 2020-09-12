import axios from 'axios';
const getBookByISBN = async (isbn) => {
  try {
    const response = await axios.get(`/api/book?query=${isbn}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};

export default getBookByISBN;

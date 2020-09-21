import axios from 'axios';
const getBooks = async (query) => {
  try {
    const response = await axios.get(`/api/book?query=${encodeURI(query)}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
};

export default getBooks;

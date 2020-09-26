import axios from 'axios';
const getBooks = async (query, user_id) => {
  try {
    const response = await axios.get(
      `/api/book?query=${encodeURI(query)}&user_id=${encodeURI(user_id)}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
};

export default getBooks;
